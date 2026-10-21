import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { PassThrough } from 'node:stream';
import { parseDriverLicenseText, normalizeDriverLicenseDate } from '../src/dl-ocr-parser.mjs';
import { extractLicenseFields, imageDimensions, recognizeLocally } from '../src/local-ocr.mjs';

test('document parser extracts labeled and AAMVA names without creating values for missing fields', async () => {
  const labeled = parseDriverLicenseText('LN TESTER\nFN SAMPLE\nMN DEMO\nDOB 01/02/1990\nEXP 12/31/2030\nDL NUMBER SYNTH-123\n123 EXAMPLE ST\nSAMPLE CITY, MN 12345');
  assert.equal(labeled.firstName, 'SAMPLE'); assert.equal(labeled.middleName, 'DEMO'); assert.equal(labeled.lastName, 'TESTER');
  assert.equal(labeled.dateOfBirth, '1990-01-02'); assert.equal(labeled.driversLicenseNumber, 'SYNTH-123');
  assert.equal(labeled.state, 'MN'); assert.equal(labeled.addressLine1, '123 EXAMPLE ST');
  const barcodeText = parseDriverLicenseText('DCSLAST\nDACFIRST\nDADMIDDLE\nDBB01021990\nDBA12312030\nDAQSYNTH-456');
  assert.equal(barcodeText.lastName, 'LAST'); assert.equal(barcodeText.middleName, 'MIDDLE');
  assert.equal(normalizeDriverLicenseDate('02/30/2030'), '');
  await assert.rejects(extractLicenseFields(Buffer.alloc(1), async () => 'unreadable photograph'), e => e.code === 'ocr_no_fields');
});

test('native reader constrains image dimensions and streams data without a shell or text logs', async () => {
  const png = Buffer.alloc(32); Buffer.from('89504e470d0a1a0a','hex').copy(png); png.writeUInt32BE(100,16); png.writeUInt32BE(100,20);
  assert.deepEqual(imageDimensions(png), [100,100]);
  let options, command, argumentsList;
  const fakeSpawn = (cmd, args, opts) => {
    command = cmd; argumentsList = args; options = opts;
    const child = new EventEmitter(); child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.kill = () => {};
    child.stdin.on('finish', () => { child.stdout.write('FN SYNTHETIC'); child.emit('close', 0); });
    return child;
  };
  const output = await recognizeLocally(png, { spawnImpl: fakeSpawn });
  assert.equal(output, 'FN SYNTHETIC'); assert.equal(command, 'tesseract');
  assert.deepEqual(argumentsList.slice(0,2), ['stdin','stdout']); assert.equal(options.shell, false); assert.equal(options.stdio[2], 'ignore');
  png.writeUInt32BE(8000,16); png.writeUInt32BE(8000,20);
  await assert.rejects(recognizeLocally(png, { spawnImpl: fakeSpawn }), e => e.code === 'ocr_image_dimensions');
});
