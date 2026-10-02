import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import handler from './api/explain.js';
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
 res.status=n=>{res.statusCode=n;return res;};res.json=data=>res.end(JSON.stringify(data));
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/api/explain'){let body='';for await(const chunk of req){body+=chunk;if(body.length>25000)return res.status(413).json({error:'Request too large.'});}req.body=body;return handler(req,res);}
 if(url.pathname==='/samples.js'){res.setHeader('Content-Type','text/javascript');return res.end(await readFile('lib/samples.js'));}
 const file=path.resolve('public','.'+(url.pathname==='/'?'/index.html':url.pathname));
 if(!file.startsWith(path.resolve('public')+path.sep))return res.status(403).end();
 try{res.setHeader('Content-Type',types[path.extname(file)]||'text/plain');res.end(await readFile(file));}catch{res.status(404).end('Not found');}
}).listen(process.env.PORT||3000,()=>console.log('Code Explainer running at http://localhost:3000'));
