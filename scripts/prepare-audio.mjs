import {spawnSync} from 'node:child_process';
import {existsSync,renameSync,rmSync} from 'node:fs';
import {resolve} from 'node:path';
import {readProject} from './project.mjs';

const [directory,input]=process.argv.slice(2);
if(!directory||!input||process.argv.length!==4)throw Error('Usage: node scripts/prepare-audio.mjs PROJECT_FOLDER RECORDING');
const root=resolve(directory),source=resolve(input),d=readProject(root);
const target=resolve(root,'assets/narration.wav'),temp=resolve(root,'assets/narration.preparing.wav');
if(existsSync(target))throw Error('assets/narration.wav already exists. Move it aside before replacing the recording.');
if(existsSync(temp))throw Error('An unfinished audio import exists. Move it aside before retrying.');
const probe=spawnSync('ffprobe',['-v','error','-select_streams','a:0','-show_entries','stream=codec_type','-show_entries','format=duration','-of','json',source],{encoding:'utf8'});
if(probe.error||probe.status!==0)throw Error(`FFprobe could not read the recording: ${probe.error?.message||probe.stderr}`);
const info=JSON.parse(probe.stdout),seconds=Number(info.format?.duration);
if(!info.streams?.length||!Number.isFinite(seconds)||seconds<=0)throw Error('The recording has no readable audio.');
if(seconds>d.duration+.05)throw Error(`Recording is ${seconds.toFixed(2)}s, longer than the ${d.duration}s project. Update scene timing; speech will not be cut.`);
try {
  const result=spawnSync('ffmpeg',['-v','error','-nostdin','-y','-i',source,'-map','0:a:0','-af',`loudnorm=I=-16:TP=-1.5:LRA=11,apad=whole_dur=${d.duration}`,'-t',String(d.duration),'-ar','48000','-ac','1','-c:a','pcm_s16le',temp],{encoding:'utf8'});
  if(result.error||result.status!==0)throw Error(`FFmpeg failed: ${result.error?.message||result.stderr}`);
  renameSync(temp,target);
  console.log(`Imported ${seconds.toFixed(2)}s recording, normalized and padded to ${d.duration}s. Scene timings were not changed.`);
} finally {rmSync(temp,{force:true})}
