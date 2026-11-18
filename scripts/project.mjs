import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

export function readProject(root) {
  const d=JSON.parse(readFileSync(resolve(root,'content.json'),'utf8'));
  assert(d.width===1080&&d.height===1920,'This template supports 1080 × 1920 projects.');
  assert(Number.isInteger(d.fps)&&d.fps>0&&d.fps<=60,'fps must be an integer from 1 to 60.');
  assert(Number.isFinite(d.duration)&&d.duration>0,'duration must be positive.');
  assert(typeof d.outputFile==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.mp4$/.test(d.outputFile),'outputFile must be an MP4 filename without directories.');
  const s=d.safe;
  assert(s&&[s.left,s.top,s.right,s.bottom].every(Number.isFinite)&&0<=s.left&&s.left<s.right&&s.right<=d.width&&0<=s.top&&s.top<s.bottom&&s.bottom<=d.height,'Invalid safe rectangle.');
  assert(Array.isArray(d.beats)&&d.beats.length>0&&d.beats.length<=40,'Provide 1–40 beats.');
  const ids=new Set();let end=0;
  for(const b of d.beats) {
    assert(typeof b.id==='string'&&b.id&&!ids.has(b.id),'Beat ids must be unique nonempty strings.');ids.add(b.id);
    assert(typeof b.scene==='string'&&b.scene,'Every beat needs a scene id.');
    assert(Number.isFinite(b.start)&&Math.abs(b.start-end)<.001&&Number.isFinite(b.duration)&&b.duration>0,`${b.id}: beats must be contiguous, starting at zero.`);
    assert(Number.isFinite(b.voiceDuration)&&b.voiceDuration>0&&b.voiceDuration<=b.duration,`${b.id}: invalid voiceDuration.`);
    for(const [field,min,max] of [['title',1,2],['captions',1,100]])assert(Array.isArray(b[field])&&b[field].length>=min&&b[field].length<=max&&b[field].every(v=>typeof v==='string'&&v.trim()),`${b.id}: invalid ${field}.`);
    assert(typeof b.eyebrow==='string'&&typeof b.narration==='string'&&/^#[a-fA-F0-9]{6}$/.test(b.accent),`${b.id}: missing text or accent color.`);
    if(b.arabic)assert(Array.isArray(b.arabic)&&b.arabic.length<=2&&b.arabic.every(v=>typeof v==='string'&&v.trim()),`${b.id}: invalid Arabic lines.`);
    assert(Array.isArray(b.captionStarts)&&b.captionStarts.length===b.captions.length&&b.captionStarts[0]===0&&b.captionStarts.every((v,i)=>Number.isFinite(v)&&v>=0&&v<b.duration&&(i===0||v>b.captionStarts[i-1])),`${b.id}: captionStarts must start at zero, increase, and match the captions.`);
    end=b.start+b.duration;
  }
  assert(Math.abs(end-d.duration)<.001,'Final beat must end at project duration.');
  assert(Array.isArray(d.contactChecks),'Provide contactChecks (empty is allowed for resting figures).');
  for(const c of d.contactChecks)assert(Array.isArray(c)&&typeof c[0]==='string'&&Number.isFinite(c[1])&&c[1]>=0&&Array.isArray(c[2])&&c[2].length===2&&c[2].every(Number.isFinite)&&(c[3]===undefined||(Number.isInteger(c[3])&&c[3]>=0)),'Invalid contact check.');
  return d;
}
