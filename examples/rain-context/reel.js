(async function () {
  const data=await (await fetch('content.json?v=2')).json();
  await Promise.all([document.fonts.load('700 72px "Balsamiq Sans"'),document.fonts.load('400 40px "Balsamiq Sans"'),document.fonts.load('600 60px Arabic')]);
  const canvas=document.getElementById('reel'),g=canvas.getContext('2d'),R=window.RIG;
  const paper='#ffffff',ink='#141414';
  const recording=await fetch('assets/narration.wav');
  if(!recording.ok)throw Error('Could not load narration.');
  // Load once so seeking also works on simple static servers.
  const audio=new Audio(URL.createObjectURL(await recording.blob()));
  let playing=false,current=0,raf=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function label(s,x,y,size=36,col=ink,align='left',weight=400){g.font=`${weight} ${size}px "Balsamiq Sans"`;g.fillStyle=col;g.textAlign=align;g.textBaseline='alphabetic';g.fillText(s,x,y)}
  function draw(time,showSafe=false){
    time=Math.max(0,Math.min(data.duration-.001,time));
    const idx=data.beats.findLastIndex(b=>b.start<=time),b=data.beats[idx],local=time-b.start;
    g.resetTransform();g.globalAlpha=1;g.fillStyle=paper;g.fillRect(0,0,1080,1920);
    const enter=1-R.E.out3(R.seg(local,0,.42));g.save();g.translate(0,enter*22);
    const ey=b.eyebrow.split(' / ');
    if(ey.length===3){label(ey[0]+' /',80,270,30,b.accent);g.font='600 39px Arabic';g.fillStyle=b.accent;g.textAlign='left';g.fillText(ey[1],180,270);label('/ '+ey[2],294,270,30,b.accent)}else label(b.eyebrow,80,270,30,b.accent);
    b.title.forEach((s,i)=>label(s,78,350+i*92,82,ink,'left',700));
    const lineW=Math.min(650,260+time*6);R.wline(g,[[80,478],[80+lineW*.45,480],[80+lineW,476]],8,b.accent);g.restore();
    if(b.arabic){g.save();g.fillStyle=ink;g.textAlign='center';b.arabic.forEach((line,i)=>{g.font='600 60px Arabic';const size=Math.min(60,880/Math.max(1,g.measureText(line).width)*60);g.font=`600 ${size}px Arabic`;g.fillText(line,510,610+i*75)});g.restore()}
    R.ln(g,60,1152,960,1152,2,ink);
    g.save();g.translate(510,1150);g.scale(2.65,2.65);
    // Hold the payoff; the reusable scene's reset only happens after this Reel shot cuts.
    const sceneTime=Math.min(4.75,local/b.duration*5.0);
    SCENES[b.scene].draw(g,{t:local,on:true,u:sceneTime/6,w:1,n:0,since:99,st:{},wave:0,wt:0});g.restore();
    const weights=b.captions.map(s=>s.split(' ').length+1),total=weights.reduce((a,b)=>a+b,0),pos=R.seg(local,.1,Math.max(.2,b.voiceDuration))*total;
    let cumulative=0,captionPos=b.captions.length-1;
    for(let i=0;i<weights.length;i++){cumulative+=weights[i];if(pos<cumulative){captionPos=i;break}}
    if(b.captionStarts)captionPos=Math.max(0,b.captionStarts.findLastIndex(t=>t<=local));
    const caption=b.captions[captionPos];
    g.font='400 51px "Balsamiq Sans"';let lines=[caption];
    if(g.measureText(caption).width>860){const words=caption.split(' ');let a='';lines=[];for(const word of words){if(g.measureText(a+' '+word).width>860){lines.push(a);a=word}else a+=(a?' ':'')+word}if(a)lines.push(a)}
    const y0=lines.length===1?1380:1350;lines.forEach((s,i)=>label(s,510,y0+i*58,51,ink,'center'));
    const progressStep=880/data.beats.length,progressWidth=progressStep-16;
    for(let i=0;i<data.beats.length;i++){const x=70+i*progressStep;g.fillStyle=i<idx?b.accent:'#e5e5e5';R.rr(g,x,1470,progressWidth,5,2);g.fill();if(i===idx){g.fillStyle=b.accent;R.rr(g,x,1470,progressWidth*Math.max(.01,local/b.duration),5,2);g.fill()}}
    if(showSafe){g.fillStyle='#bb28402b';g.fillRect(0,0,1080,data.safe.top);g.fillRect(0,data.safe.bottom,1080,1920-data.safe.bottom);g.fillRect(0,data.safe.top,data.safe.left,data.safe.bottom-data.safe.top);g.fillRect(data.safe.right,data.safe.top,1080-data.safe.right,data.safe.bottom-data.safe.top);g.strokeStyle='#27724f';g.lineWidth=3;g.setLineDash([12,10]);g.strokeRect(data.safe.left,data.safe.top,data.safe.right-data.safe.left,data.safe.bottom-data.safe.top);g.setLineDash([])}
    return {idx,id:b.id,local,caption};
  }
  window.REEL={data,draw};
  const play=document.getElementById('play'),scrub=document.getElementById('scrub'),safe=document.getElementById('safe');
  function step(){if(!playing)return;current=audio.currentTime;draw(current,safe.checked);scrub.value=current/data.duration*100;if(current>=data.duration-.05||audio.ended){playing=false;play.textContent='Replay with narration';return}raf=requestAnimationFrame(step)}
  play.onclick=async()=>{if(playing){playing=false;audio.pause();cancelAnimationFrame(raf);play.textContent='Continue';return}if(current>=data.duration-.1)current=0;audio.currentTime=current;try{await audio.play();playing=true;play.textContent='Pause';step()}catch(e){play.textContent='Try playing again';console.error(e)}};
  scrub.oninput=()=>{current=+scrub.value/100*data.duration;audio.currentTime=current;draw(current,safe.checked)};
  safe.onchange=()=>draw(current,safe.checked);
  canvas.onclick=()=>{const b=data.beats.findLast(b=>b.start<=current);current=b.start;audio.currentTime=current;draw(current,safe.checked)};
  draw(reduced?2.8:0);window.ready=true;
})();
