import {createServer} from 'node:http';
import {readFileSync,realpathSync,statSync} from 'node:fs';
import {resolve,sep,extname} from 'node:path';
import {fileURLToPath} from 'node:url';

export async function serveProject(directory,port=0) {
  const root=realpathSync(directory);
  const server=createServer((req,res)=>{
    try {
      const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      let path=resolve(root,'.'+pathname);
      if(statSync(path).isDirectory())path=resolve(path,'index.html');
      path=realpathSync(path);
      if(!path.startsWith(root+sep))throw Error('Outside project');
      const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.ttf':'font/ttf','.wav':'audio/wav','.mp4':'video/mp4','.png':'image/png','.md':'text/plain; charset=utf-8'};
      res.setHeader('Content-Type',types[extname(path)]||'application/octet-stream');
      res.setHeader('Cache-Control','no-store');res.end(readFileSync(path));
    } catch {res.writeHead(404);res.end('Not found')}
  });
  await new Promise((ok,no)=>{server.once('error',no);server.listen(port,'127.0.0.1',ok)});
  return server;
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  if(!process.argv[2])throw Error('Usage: node scripts/preview.mjs PROJECT_FOLDER [PORT]');
  const port=Number(process.argv[3]||8765);
  if(!Number.isInteger(port)||port<1||port>65535)throw Error('Invalid port.');
  const server=await serveProject(resolve(process.argv[2]),port);
  console.log(`Preview: http://127.0.0.1:${server.address().port}/ — Ctrl-C stops the server.`);
}
