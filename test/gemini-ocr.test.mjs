import test from 'node:test';import assert from 'node:assert/strict';
import {extractGeminiFields,validateGeminiFields} from '../src/gemini-ocr.mjs';
const png=Buffer.alloc(32);Buffer.from('89504e470d0a1a0a','hex').copy(png);png.writeUInt32BE(100,16);png.writeUInt32BE(100,20);
const fields={firstName:'SAMPLE',middleName:'DEMO',lastName:'TESTER',dateOfBirth:'1990-01-02',driversLicenseExpirationDate:'2030-12-31',zipCode:'01234',state:'MN',phoneNumber:'not allowed'};
const reply=data=>Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(data)}]}}]});
test('Google extraction uses fixed host, header credential and structured fields without the local text parser',async()=>{
 let seen;const result=await extractGeminiFields(png,'image/png',{apiKey:'synthetic-secret',fetchImpl:async(url,options)=>{seen={url,options};return reply(fields)}});
 assert.equal(result.firstName,'SAMPLE');assert.equal(result.middleName,'DEMO');assert.equal(result.dateOfBirth,'1990-01-02');assert.equal(result.zipCode,'01234');assert.equal(result.phoneNumber,undefined);
 assert.ok(!seen.url.includes('synthetic-secret'));assert.equal(seen.options.headers['x-goog-api-key'],'synthetic-secret');assert.equal(seen.options.redirect,'error');
 const body=JSON.parse(seen.options.body);assert.equal(body.contents[0].parts[1].inlineData.data,png.toString('base64'));assert.equal(body.generationConfig.responseFormat.text.mimeType,'APPLICATION_JSON');
});
test('Google failures are bounded, sanitized and never fall back or retry',async()=>{
 for(const r of [new Response('secret provider body',{status:429}),new Response('<html>no</html>'),Response.json({candidates:[{finishReason:'MAX_TOKENS',content:{parts:[{text:'{}'}]}}]})]){
  let n=0;await assert.rejects(extractGeminiFields(png,'image/png',{apiKey:'synthetic-secret',fetchImpl:async()=>{n++;return r}}),e=>!e.message.includes('secret'));assert.equal(n,1);
 }
 await assert.rejects(extractGeminiFields(png,'image/png',{}),e=>e.code==='ocr_not_configured');
 await assert.rejects(extractGeminiFields(png,'image/png',{apiKey:'synthetic',fetchImpl:async()=>{throw Error('secret')}}),e=>e.code==='ocr_network'&&!e.message.includes('secret'));
 assert.throws(()=>validateGeminiFields({firstName:42}));
 assert.throws(()=>validateGeminiFields({}));assert.equal(validateGeminiFields({...fields,dateOfBirth:'02/30/1990'}).dateOfBirth,'');
});
