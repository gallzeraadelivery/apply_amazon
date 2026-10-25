import test from 'node:test';import assert from 'node:assert/strict';
import {AmazonPhoneClient,phoneState} from '../src/amazon-phone.mjs';
import {phoneFixture,cnep} from './helpers/phone-fixture.mjs';
test('official phone form is prepared without mutation, then one removal is verified by fresh CNEP',async()=>{
 const f=phoneFixture(),c=new AmazonPhoneClient({fetchImpl:f.fetchImpl}),p=await c.prepare('synthetic-refresh');
 assert.equal(p.state,'present');assert.ok(!f.calls.some(x=>x.opts.method==='POST'&&x.url.includes('/ap/profile/mobilephone')));
 const r=await c.remove(p.session);assert.equal(r.confirmed,true);
 const posts=f.calls.filter(x=>x.opts.method==='POST'&&x.url.includes('/ap/profile/mobilephone'));assert.equal(posts.length,1);
 const fields=new URLSearchParams(posts[0].opts.body);assert.equal(fields.get('appAction'),'REMOVE_MOBILE_PHONE');assert.deepEqual(fields.getAll('deleteMobilePhone'),['irrelevant','Submit']);assert.equal(fields.has('newMobilePhoneNumber'),false);assert.ok(!JSON.stringify(r).includes('synthetic-token'));
});
test('absent phone, changed contract, unsafe redirects and uncertain results never fake removal or retry',async()=>{
 const absent=phoneFixture('absent');const p=await new AmazonPhoneClient({fetchImpl:absent.fetchImpl}).prepare('synthetic');assert.equal(p.state,'absent');assert.equal(p.session,undefined);
 for(const mode of ['foreign','bad-action','bad-command']){const f=phoneFixture(mode);await assert.rejects(new AmazonPhoneClient({fetchImpl:f.fetchImpl}).prepare('synthetic'));assert.ok(!f.calls.some(x=>x.url.includes('evil.example')));assert.ok(!f.calls.some(x=>x.opts.method==='POST'&&x.url.includes('/ap/profile/mobilephone')))}
 for(const mode of ['network','challenge','unchanged']){const f=phoneFixture(mode),c=new AmazonPhoneClient({fetchImpl:f.fetchImpl}),p=await c.prepare('synthetic');if(mode==='unchanged')assert.equal((await c.remove(p.session)).confirmed,false);else await assert.rejects(c.remove(p.session),e=>e.code==='amazon_phone_unconfirmed');assert.equal(f.calls.filter(x=>x.opts.method==='POST'&&x.url.includes('/ap/profile/mobilephone')).length,1)}
 assert.equal(phoneState(cnep('absent')+cnep('present')),'unknown');assert.equal(phoneState('<html>not a phone form</html>'),'unknown');
});
