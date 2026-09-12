(()=>{let worker,pending,id=0;
function ensure(){if(!worker)worker=new Worker('./onnx-worker.js');return worker;}
window.KrishiDual={supports(crop){return ['auto','apple','blueberry','cherry','corn','maize','grape','orange','peach','pepper','potato','raspberry','soybean','squash','strawberry','tomato'].includes(String(crop).toLowerCase());},warm(){try{ensure().postMessage({warm:true});}catch{}},run(file){if(pending)return Promise.reject(Error('ONNX busy'));return new Promise((resolve,reject)=>{let timer;try{const w=ensure(),n=++id;pending=true;const stop=()=>{clearTimeout(timer);pending=false;};w.onmessage=({data})=>{if(data.id!==n)return;stop();data.error?reject(Error(data.error)):resolve(data.result);};w.onerror=()=>{stop();w.terminate();worker=null;reject(Error('ONNX unavailable'));};timer=setTimeout(()=>{stop();w.terminate();worker=null;reject(Error('ONNX timed out'));},12000);w.postMessage({id:n,file});}catch(e){clearTimeout(timer);pending=false;reject(e);}});},compare(local,remote){
const norm=s=>String(s||'').toLowerCase().replace(/\([^)]*\)/g,'').replace(/[^a-z0-9]/g,'');
const aliases={corn:'maize',grapevine:'grape',solanumlycopersicum:'tomato',solanumtuberosum:'potato',zeamays:'maize',vitisvinifera:'grape'};
const crop=s=>aliases[norm(s)]||norm(s);const parts=local.className.split('___');
return Boolean(remote&&crop(parts[0])===crop(remote.crop)&&norm(parts[1])===norm(remote.finding));
}};
})();
