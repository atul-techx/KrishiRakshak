import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import {handleAPI} from '../api.mjs';
const root=new URL('../',import.meta.url);
test('both pages reference existing relative local scripts and styles',()=>{
for(const file of ['index.html','crop-app.html']){
const html=readFileSync(new URL(file,root),'utf8');
for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
if(/^(https?:|#|data:)/.test(ref))continue;
assert.ok(!ref.startsWith('/'),ref);assert.ok(existsSync(new URL(ref.split('?')[0],root)),ref);
}}});
test('API client handles root, subfolder and separate backend',async()=>{
const script=readFileSync(new URL('api-client.js',root),'utf8');
for(const [page,base,expected] of [['https://example.org/','','https://example.org/api/status'],['https://example.org/project/index.html','','https://example.org/project/api/status'],['https://example.org/project/','https://api.example.org','https://api.example.org/api/status']]){
let called;const w={KRISHI_CONFIG:{API_BASE_URL:base}};
vm.runInNewContext(script,{window:w,URL,location:{protocol:'https:'},document:{baseURI:page},fetch:async url=>{called=String(url);return {headers:{get:()=> 'application/json'}}}});
await w.KrishiAPI.request('/api/status');assert.equal(called,expected);
}});
test('separate backend allows only configured website origins',async()=>{
const req=new Request('https://api.example.org/api/status',{method:'OPTIONS',headers:{Origin:'https://example.org'}});
assert.equal((await handleAPI(req,{})).status,403);
const r=await handleAPI(req,{ALLOWED_ORIGINS:'https://example.org'});assert.equal(r.status,204);assert.equal(r.headers.get('Access-Control-Allow-Origin'),'https://example.org');
});
