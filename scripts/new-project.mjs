import {cpSync,existsSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const destination=process.argv[2];
if(!destination||process.argv.length!==3)throw Error('Usage: node scripts/new-project.mjs NEW_FOLDER');
const root=resolve(destination),skill=resolve(dirname(fileURLToPath(import.meta.url)),'..');
if(existsSync(root))throw Error('Destination already exists. Choose a new folder; nothing was changed.');
mkdirSync(root,{recursive:true});
cpSync(resolve(skill,'assets/starter'),root,{recursive:true});
cpSync(resolve(skill,'assets/fonts'),resolve(root,'assets'),{recursive:true});
cpSync(resolve(skill,'runtime/stick.js'),resolve(root,'assets/stick.js'));
cpSync(resolve(skill,'runtime/LICENSE'),resolve(root,'assets/STICK-LICENSE'));
cpSync(resolve(skill,'LICENSE'),resolve(root,'LICENSE'));
console.log(`Created ${root}. Edit script.txt, scenes.js and content.json; import narration before exporting.`);
