import {readFileSync,writeFileSync,mkdirSync,renameSync,rmSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn,spawnSync} from 'node:child_process';
import {once} from 'node:events';
import assert from 'node:assert/strict';
import {readProject} from './project.mjs';
import {serveProject} from './preview.mjs';
import {launchBrowser} from './browser.mjs';

const args=process.argv.slice(2),check=args.includes('--check');
assert(args.length===(check?2:1)&&args[0]!=='--check','Usage: node scripts/render.mjs PROJECT_FOLDER [--check]');
const root=resolve(args[0]),data=readProject(root),output=resolve(root,'output');
mkdirSync(output,{recursive:true});
const server=await serveProject(root);let browser,ff;
const temporary=resolve(output,data.outputFile.replace(/\.mp4$/,'.part.mp4'));
try {
  browser=await launchBrowser();
  const page=await browser.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.ready,{},{timeout:15000});
  const contactPage=await browser.newPage();
  await contactPage.setContent('<canvas></canvas>');
  await contactPage.addScriptTag({path:resolve(root,'assets/stick.js')});
  await contactPage.evaluate(()=>{const original=RIG.fig;window.drawnHands=[];RIG.fig=(...args)=>{const joints=original(...args);drawnHands.push(joints.w.handF);return joints}});
  await contactPage.addScriptTag({path:resolve(root,'scenes.js')});
  const contactChecks=await contactPage.evaluate(checks=>{
    const canvas=document.createElement('canvas');canvas.width=380;canvas.height=230;
    const g=canvas.getContext('2d');g.translate(190,192);
    return checks.map(([scene,time,target,figure=0])=>{
      const def=SCENES[scene];if(!def)throw Error(`Unknown contact scene ${scene}`);
      if(time>def.dur)throw Error(`Contact time exceeds ${scene} duration`);
      drawnHands=[];def.draw(g,{t:time,on:true,u:time/def.dur,n:0,st:{},since:99,w:1,wave:0,wt:0});
      if(!drawnHands[figure])throw Error(`No figure ${figure} in ${scene}`);
      return {scene,time,figure,distance:Math.hypot(drawnHands[figure][0]-target[0],drawnHands[figure][1]-target[1])};
    });
  },data.contactChecks);
  await contactPage.close();
  for(const c of contactChecks)assert(c.distance<1.5,`${c.scene}: hand misses prop by ${c.distance.toFixed(1)} units`);
  await page.evaluate(()=>{
    window.textIssues=[];const proto=CanvasRenderingContext2D.prototype,original=proto.fillText;
    proto.fillText=function(s,x,y,...args){
      if(this.canvas.id==='reel'&&this.globalAlpha>.001){
        const m=this.measureText(s),t=this.getTransform();
        const a=x-m.actualBoundingBoxLeft,b=x+m.actualBoundingBoxRight,c=y-m.actualBoundingBoxAscent,d=y+m.actualBoundingBoxDescent;
        const points=[[a,c],[a,d],[b,c],[b,d]].map(([x,y])=>[t.a*x+t.c*y+t.e,t.b*x+t.d*y+t.f]);
        const safe=REEL.data.safe;
        if(points.some(([x,y])=>x<safe.left-1||x>safe.right+1||y<safe.top-1||y>safe.bottom+1))textIssues.push({text:s,time:window.checkTime,points});
      }
      return original.call(this,s,x,y,...args);
    };
  });
  const times=data.beats.flatMap(b=>[b.start+Math.min(.3,b.duration*.1),b.start+b.duration*.55,b.start+b.duration*.95]);
  const thumbs=[];
  for(const time of times){await page.evaluate(t=>{window.checkTime=t;REEL.draw(t)},time);thumbs.push(await page.locator('#reel').screenshot({type:'png'}))}
  const sheet=await browser.newPage({viewport:{width:1440,height:Math.ceil(times.length/7)*390},deviceScaleFactor:1});
  await sheet.setContent(`<body style="margin:12px;background:#eee;display:grid;grid-template-columns:repeat(7,192px);gap:10px;font:13px sans-serif">${thumbs.map((b,i)=>`<div><img width="192" src="data:image/png;base64,${b.toString('base64')}"><p>${times[i].toFixed(1)}s</p></div>`).join('')}</body>`);
  await sheet.screenshot({path:resolve(output,'contact-sheet.png'),fullPage:true});await sheet.close();
  for(const [name,time,overlay] of [['cover.png',Math.min(2.7,data.duration*.5),false],['safe-zone-check.png',times[Math.floor(times.length/2)],true]]){
    const png=await page.evaluate(([t,o])=>{REEL.draw(t,o);return document.querySelector('#reel').toDataURL('image/png').split(',')[1]},[time,overlay]);writeFileSync(resolve(output,name),Buffer.from(png,'base64'));
  }
  function assertVisuals(issues){assert.equal(issues.length,0,`Text outside safe rectangle: ${JSON.stringify(issues.slice(0,4))}`);assert.deepEqual(errors,[])}
  assertVisuals(await page.evaluate(()=>textIssues));
  const stamp=t=>{const n=Math.round(t*1000);return `${String(Math.floor(n/3600000)).padStart(2,'0')}:${String(Math.floor(n/60000)%60).padStart(2,'0')}:${String(Math.floor(n/1000)%60).padStart(2,'0')},${String(n%1000).padStart(3,'0')}`};
  let number=0;const captions=data.beats.flatMap(b=>b.captions.map((caption,i)=>`${++number}\n${stamp(b.start+b.captionStarts[i])} --> ${stamp(b.start+(b.captionStarts[i+1]??b.duration))}\n${caption}\n`)).join('\n');
  writeFileSync(resolve(output,'captions.srt'),captions);
  if(check){console.log(`PASS: ${times.length} stills, safe text, browser errors and ${contactChecks.length} contacts. Audio/export not checked.`)}
  else {
    const audio=resolve(root,'assets/narration.wav');
    const probe=spawnSync('ffprobe',['-v','error','-select_streams','a:0','-show_entries','stream=codec_type','-show_entries','format=duration','-of','json',audio],{encoding:'utf8'});
    assert(!probe.error&&probe.status===0,`Missing/unreadable narration. Import audio first. ${probe.error?.message||probe.stderr}`);
    const info=JSON.parse(probe.stdout),audioDuration=Number(info.format?.duration);
    assert(info.streams?.length&&Number.isFinite(audioDuration)&&Math.abs(audioDuration-data.duration)<=.1,'Narration must match the project duration within 0.1s. Import it with prepare-audio.mjs; do not clip speech.');
    ff=spawn('ffmpeg',['-hide_banner','-loglevel','error','-nostdin','-y','-f','image2pipe','-framerate',String(data.fps),'-i','pipe:0','-i',audio,'-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart','-t',String(data.duration),temporary],{stdio:['pipe','ignore','pipe']});
    let ffError='';ff.stderr.on('data',b=>ffError+=b.toString());ff.stdin.on('error',()=>{});
    const done=once(ff,'close');done.catch(()=>{});
    const frames=Math.ceil(data.duration*data.fps);
    for(let i=0;i<frames;i++){
      if(ff.exitCode!==null)throw Error(`FFmpeg stopped: ${ffError}`);
      const jpeg=await page.evaluate(t=>{window.checkTime=t;REEL.draw(t);return document.querySelector('#reel').toDataURL('image/jpeg',.94).split(',')[1]},i/data.fps);
      if(!ff.stdin.write(Buffer.from(jpeg,'base64')))await Promise.race([once(ff.stdin,'drain'),done.then(()=>{throw Error(`FFmpeg stopped: ${ffError}`)})]);
      if(i%300===0)console.log(`Rendered ${i}/${frames} frames`);
    }
    ff.stdin.end();const [code]=await done;assert.equal(code,0,`Video export failed: ${ffError}`);
    const textIssues=await page.evaluate(()=>textIssues);assertVisuals(textIssues);
    renameSync(temporary,resolve(output,data.outputFile));
    writeFileSync(resolve(output,'verification.json'),JSON.stringify({width:data.width,height:data.height,fps:data.fps,duration:data.duration,frames,audioDuration,textSafeArea:data.safe,textViolations:textIssues,browserErrors:errors,contactChecks,checkedAt:new Date().toISOString()},null,2));
    console.log(`PASS: ${frames} frames checked; exported output/${data.outputFile}`);
  }
} finally {
  if(ff&&ff.exitCode===null)ff.kill();
  rmSync(temporary,{force:true});
  if(browser)await browser.close();server.close();
}
