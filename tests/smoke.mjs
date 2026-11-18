import {mkdtempSync,readFileSync,writeFileSync,existsSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {launchBrowser} from '../scripts/browser.mjs';
import {serveProject} from '../scripts/preview.mjs';

const skill=resolve(dirname(fileURLToPath(import.meta.url)),'..'),scratch=mkdtempSync(join(tmpdir(),'stick-reel-clean-'));
const root=join(scratch,'project with spaces');
function run(script,args=[],expect=0){const r=spawnSync(process.execPath,[resolve(skill,'scripts',script),...args],{encoding:'utf8',maxBuffer:5e6});assert.equal(r.status,expect,r.stdout+'\n'+r.stderr);return r.stdout+r.stderr}
let browser,server;
try{
  run('new-project.mjs',[root]);
  const original=readFileSync(join(root,'script.txt'),'utf8');
  assert.match(run('new-project.mjs',[root],1),/already exists/);assert.equal(readFileSync(join(root,'script.txt'),'utf8'),original);
  run('prepare-audio.mjs',[root,resolve(skill,'examples/focus/assets/narration.wav')]);
  assert.match(run('prepare-audio.mjs',[root,resolve(skill,'examples/focus/assets/narration.wav')],1),/already exists/);
  run('render.mjs',[root]);
  const verification=JSON.parse(readFileSync(join(root,'output/verification.json')));
  assert.deepEqual(verification.textViolations,[]);assert(verification.frames>300);
  const video=join(root,'output/focus.mp4');assert(existsSync(video));
  const decode=spawnSync('ffmpeg',['-v','error','-i',video,'-f','null','-'],{encoding:'utf8'});assert.equal(decode.status,0,decode.stderr);
  server=await serveProject(root);browser=await launchBrowser();const page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/`);await page.waitForFunction(()=>window.ready);
  await page.locator('#play').click();await page.waitForFunction(()=>Number(document.querySelector('#scrub').value)>.15,{},{timeout:15000});await page.locator('#play').click();
  await page.locator('#scrub').fill('60');await page.locator('#safe').check();assert(await page.locator('#safe').isChecked());await page.locator('#safe').uncheck();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.deepEqual(errors,[]);
  await browser.close();browser=null;
  const content=JSON.parse(readFileSync(join(root,'content.json')));content.contactChecks[0][2][0]+=20;writeFileSync(join(root,'content.json'),JSON.stringify(content));
  assert.match(run('render.mjs',[root,'--check'],1),/hand misses/);
  content.contactChecks=[];content.beats[0].title=['A title deliberately far too long to fit inside the safe rectangle'];writeFileSync(join(root,'content.json'),JSON.stringify(content));
  assert.match(run('render.mjs',[root,'--check'],1),/Text outside safe rectangle/);
  console.log('PASS: fresh project in a path with spaces, audio import, export/decode, playback, mobile layout, rejected missed contact and overflowing title.');
}finally{if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));rmSync(scratch,{recursive:true,force:true})}
