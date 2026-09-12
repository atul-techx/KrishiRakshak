import {loadEnvironment,configuration} from './runtime-config.mjs';
loadEnvironment();
const runtime=configuration();
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {handleAPI} from './api.mjs';
const assets=new Set(["rakshak-logo.png", "theme.css", "index.html", "product-fixes.js", "onnx-worker.js", "sentinel-core.js", "config.js", "sentinel.css", "rakshak-chat.js", "crop-app.html", "workflow.js", "api-client.js", "style.css", "sentinel.js", "i18n.js", "reports.js", "app.js", "sw.js", "dual-check.js", "scan-bridge.js", "repairs.js", "public/models/cropguard.onnx", "public/models/ATTRIBUTION.txt", "public/models/classes.json", "public/vendor/ort-wasm-simd-threaded.wasm", "public/vendor/ort-wasm-simd-threaded.mjs", "public/vendor/ort.min.js", "public/vendor/LICENSE.txt"]);
const mime={html:'text/html',js:'text/javascript',mjs:'text/javascript',wasm:'application/wasm',css:'text/css',json:'application/json',txt:'text/plain',png:'image/png'};
http.createServer(async(req,res)=>{try{
const url=new URL(req.url,`${req.headers['x-forwarded-proto']==='https'?'https':'http'}://${req.headers.host||'localhost'}`);
if(url.pathname.startsWith('/api/')){
let size=0,chunks=[];for await(const chunk of req){size+=chunk.length;if(size>4500000){res.writeHead(413);res.end('Request too large');return;}chunks.push(chunk);}
const request=new Request(url,{method:req.method,headers:req.headers,...(['GET','HEAD'].includes(req.method)?{}:{body:Buffer.concat(chunks)})});
const out=await handleAPI(request,process.env);res.writeHead(out.status,Object.fromEntries(out.headers));res.end(await out.text());return;}
const name=url.pathname==='/'?'index.html':url.pathname==='/scan'?'crop-app.html':decodeURIComponent(url.pathname.slice(1));
if(!assets.has(name)){res.writeHead(404);res.end('Not found');return;}
const data=await readFile(new URL(name,import.meta.url));res.writeHead(200,{'Content-Type':mime[name.split('.').pop()]||'application/octet-stream','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);
}catch{res.writeHead(500);res.end('Unable to process request');}}).listen(runtime.port,runtime.host,()=>console.log('KrishiRakshak is running. Open http://localhost:'+(process.env.PORT||3000)));
