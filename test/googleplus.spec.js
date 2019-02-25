'use strict';

/* globals describe, it */

const socialUrl = require('..');
const assert = require('assert');
const assertUtil = require('./assertUtil');

describe('google plus', function () {
  it('doesn\'t parse non google+ urls', function () {
    const plus = socialUrl.parse('https://not-plus.google.com/103419843882610272894?test=1');
    assert.notStrictEqual(plus.network, 'Google+');
  });

  function testPlus (url, user, expectedUrl) {
    return assertUtil.testNetwork('Google+', url, user, expectedUrl);
  }

  testPlus('https://plus.google.com/103419843882610272894?test=1', '103419843882610272894');
  testPlus('https://plus.google.com/u/0/103419843882610272894/posts?t=1', '103419843882610272894');
  testPlus('plus.google.com/+Intrafocus/posts', '+Intrafocus', 'https://plus.google.com/+Intrafocus/posts');
  testPlus('https://plus.google.com/+Lamborghini', '+Lamborghini');
  testPlus('https://plus.google.com/+Lamborghini?some=stuff', '+Lamborghini');
  testPlus('https://plus.google.com/+Lamborghini#hash-fragment', '+Lamborghini');
  testPlus('https://plus.google.com/+Lamborghini/some/path', '+Lamborghini');
  testPlus('https://plus.google.com/Lamborghini/some/path', null);
  testPlus('https://plus.google.com/Lamborghini', null);
  testPlus('https://plus.google.com', null);
  testPlus('plus.google.com/+Lamborghini', '+Lamborghini', 'https://plus.google.com/+Lamborghini');
  testPlus('https://plus.google.com/u/0/b/110689938472214097572/+Karstrider-canyoning', '+Karstrider-canyoning');
  testPlus('https://plus.google.com/u/0/+MundoipNet/about', '+MundoipNet');
  testPlus('https://plus.google.com/u/123/108208977490755594504/', '108208977490755594504');
  testPlus('https://plus.google.com/+OpelBauerK%C3%B6ln', '+OpelBauerKöln');
  testPlus('https://www.google.com/+ServeratworkLLC', '+ServeratworkLLC');
  testPlus('https://plus.google.com/u/0/b/109664828021327038088/109664828021327038088/about?gmbpt=true&hl=en', '109664828021327038088');
});
