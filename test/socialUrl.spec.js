'use strict';

/* globals it, describe */

const socialUrl = require('..');
const assert = require('assert');

describe('socialUrl', function () {
  it('doesn\'t fail on null input', function () {
    assert.strictEqual(socialUrl.parse(null).network, null);
  });

  it('doesn\'t fail on undefined input', function () {
    assert.strictEqual(socialUrl.parse().network, null);
  });

  it('doesn\'t fail on non string input', function () {
    assert.strictEqual(socialUrl.parse({}).network, null);
  });

  it('doesn\'t fail on empty string', function () {
    assert.strictEqual(socialUrl.parse('#').network, null);
  });

  it('doesn\'t fail on #', function () {
    assert.strictEqual(socialUrl.parse('#').network, null);
  });

  it('doesn\'t fail on hostnames without a .', function () {
    assert.strictEqual(socialUrl.parse('http://hostname').network, null);
  });
});
