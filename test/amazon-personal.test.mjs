import test from 'node:test';
import assert from 'node:assert/strict';
import { AmazonPersonalClient, personalPayload } from '../src/amazon-personal.mjs';
import { cropGeometry } from '../public/image-adjust.mjs';
import { renderAmazonDetail } from '../public/amazon-detail.mjs';
const fields={firstName:'SAMPLE',middleName:'DEMO',lastName:'TESTER',addressLine1:'123 EXAMPLE ST',city:'SAMPLE CITY',state:'MN',zipCode:'12345',phoneNumber:'2025550123'};
function fixture(mode='success') {
 const calls=[];let saved=false;
 const client=new AmazonPersonalClient({fetchImpl:async(url,opts)=>{
  calls.push({url,opts});
  if(url.endsWith('/ap/exchangetoken/cookies'))return Response.json({response:{tokens:{cookies:{'.amazon.com':[{Name:'session',Value:'synthetic'}]}}}});
  if(url.endsWith('/home-menu'))return new Response('portal');
  if(url.endsWith('/get-personal-info'))return Response.json({success:true,data:{...fields,firstName:saved&&mode!=='mismatch'?'SAMPLE':'BEFORE',nameEditable:mode!=='locked'}});
  if(url.endsWith('/csrf-token'))return Response.json({token:'synthetic-csrf'});
  if(url.endsWith('/get-csrf-token'))return new Response('{}',{headers:{'anti-csrftoken-a2z':'synthetic-anti'}});
  if(url.endsWith('/submit-personal-info')){if(mode==='network')throw Error('failure');saved=true;return mode==='html'?new Response('<html>shell</html>'):Response.json({success:mode!=='rejected'});}
  throw Error('unexpected');
 }});return {client,calls};
}
test('personal submit uses current account endpoint, whitelists data and verifies readback',async()=>{
 const f=fixture(),r=await f.client.submit('synthetic',{...fields,email:'local@example.test',driversLicenseNumber:'LOCAL-ONLY'});
 assert.equal(r.confirmed,true);const sent=f.calls.find(c=>c.opts.method==='POST'&&c.url.endsWith('/submit-personal-info'));
 const b=JSON.parse(sent.opts.body);assert.equal(b.firstName,'SAMPLE');assert.equal(b.address,fields.addressLine1);assert.equal(b.email,undefined);assert.equal(b.driversLicenseNumber,undefined);assert.equal(sent.opts.headers['X-CSRF-Token'],'synthetic-csrf');assert.equal(sent.opts.headers['anti-csrftoken-a2z'],'synthetic-anti');
 assert.ok(!f.calls.some(c=>c.url.includes('/v2/data/personal-info')));
});
test('locked names and invalid inputs never mutate, uncertain responses never retry',async()=>{
 assert.throws(()=>personalPayload({...fields,phoneNumber:''}));
 const locked=fixture('locked');await assert.rejects(locked.client.submit('synthetic',fields),e=>e.code==='amazon_name_locked');assert.ok(!locked.calls.some(c=>c.url.endsWith('/submit-personal-info')));
 for(const mode of ['network','html','rejected']){const f=fixture(mode);await assert.rejects(f.client.submit('synthetic',fields));assert.equal(f.calls.filter(c=>c.url.endsWith('/submit-personal-info')).length,1)}
 const f=fixture('mismatch');assert.equal((await f.client.submit('synthetic',fields)).confirmed,false);
});
test('crop geometry covers the output without stretching and clamps movement',()=>{
 const g=cropGeometry(2000,1000,1000,1000,1,999,-999);assert.deepEqual(g,{scale:1,x:500,y:0});
 const rotated=cropGeometry(1000,2000,1280,808,2,-99999,99999);assert.equal(rotated.scale,2.56);assert.ok(rotated.x<=0);assert.ok(rotated.y>=0);assert.ok(1000*rotated.scale>=1280);assert.ok(2000*rotated.scale>=808);
});
test('saved document name survives page render without claiming Amazon profile changed',()=>{
 const html=renderAmazonDetail({account:{id:'synthetic',label:'Connection'},result:{profile:{displayName:'Before'}},formFields:fields,formSavedAt:'2026-10-21T00:00:00Z'});
 assert.ok(html.includes('SAMPLE DEMO TESTER'));assert.ok(html.includes('data-send-personal'));
});
