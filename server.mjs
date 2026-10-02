import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import handler from './api/explain.js';
const root=fileURLToPath(new URL('./',import.meta.url));
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
 res.status=n=>{res.statusCode=n;return res;};res.json=value=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(value));};
 if(req.url==='/api/explain'){let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>30000)return res.status(413).json({error:'Request too large.'});}try{req.body=raw?JSON.parse(raw):{};}catch{return res.status(400).json({error:'Invalid JSON.'});}return handler(req,res);}
 const pathname=new URL(req.url,'http://localhost').pathname;const file=pathname==='/'?'index.html':pathname.slice(1);
 if(!/^(index\.html|styles\.css|app\.js|demo\.js|favicon\.svg|vendor\/[a-zA-Z.-]+)$/.test(file)){res.statusCode=404;return res.end('Not found');}
 try{const data=await readFile(root+file);res.setHeader('Content-Type',types[file.slice(file.lastIndexOf('.'))]||'text/plain');res.end(data);}catch{res.statusCode=404;res.end('Not found');}
}).listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Code Explainer AI: http://localhost:3000'));
