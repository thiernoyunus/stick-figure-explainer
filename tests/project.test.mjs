import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync,rmSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {readProject} from '../scripts/project.mjs';
import {serveProject} from '../scripts/preview.mjs';

const starter=JSON.parse(readFileSync(new URL('../assets/starter/content.json',import.meta.url)));
function withProject(change,check){const root=mkdtempSync(join(tmpdir(),'stick-figure-explainer-test-'));try{const data=structuredClone(starter);change(data);writeFileSync(join(root,'content.json'),JSON.stringify(data));check(root)}finally{rmSync(root,{recursive:true,force:true})}}
test('rejects gaps and overlaps instead of silently losing frames',()=>{for(const delta of [-.1,.1])withProject(d=>d.beats[1].start+=delta,p=>assert.throws(()=>readProject(p),/contiguous/))});
test('rejects invalid caption timings and output traversal',()=>{
  withProject(d=>d.beats[0].captionStarts[1]=d.beats[0].duration,p=>assert.throws(()=>readProject(p),/captionStarts/));
  withProject(d=>d.outputFile='../outside.mp4',p=>assert.throws(()=>readProject(p),/filename/));
});
test('accepts the complete timed starter',()=>withProject(()=>{},p=>assert.equal(readProject(p).beats.length,2)));
test('preview serves project files but refuses an outside symlink',async()=>{
  const root=mkdtempSync(join(tmpdir(),'stick-figure-explainer-server-'));let server;
  try{writeFileSync(join(root,'index.html'),'project');writeFileSync(join(root,'outside.txt'),'private');const project=join(root,'project');
    const {mkdirSync}=await import('node:fs');mkdirSync(project);writeFileSync(join(project,'index.html'),'public');symlinkSync(resolve(root,'outside.txt'),join(project,'leak.txt'));
    server=await serveProject(project);const base=`http://127.0.0.1:${server.address().port}`;
    assert.equal(await(await fetch(base+'/')).text(),'public');assert.equal((await fetch(base+'/leak.txt')).status,404);
    assert.equal((await fetch(base+'/%ZZ')).status,404);
  }finally{if(server)await new Promise(r=>server.close(r));rmSync(root,{recursive:true,force:true})}
});
