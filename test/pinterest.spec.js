'use strict';

/* globals describe */

const assertUtil = require('./assertUtil');

describe('pinterest', function () {
  function testPinterest (url, user, expectedUrl) {
    return assertUtil.testNetwork('Pinterest', url, user, expectedUrl);
  }

  testPinterest('https://www.pinterest.com/', null);
  testPinterest('https://pinterest.com/', null);
  testPinterest('http://www.pinterest.com/', null);
  testPinterest('http://pinterest.com/', null);
  testPinterest('pinterest.com/', null);

  testPinterest('https://www.pinterest.com/selfhostedlife/', 'selfhostedlife');
  testPinterest('https://pinterest.com/selfhostedlife/', 'selfhostedlife');
  testPinterest('http://www.pinterest.com/selfhostedlife/', 'selfhostedlife');
  testPinterest('http://pinterest.com/selfhostedlife/', 'selfhostedlife');

  testPinterest('https://www.pinterest.com/selfhostedlife/pins/', 'selfhostedlife');
  testPinterest('https://pinterest.com/selfhostedlife/pins/', 'selfhostedlife');
  testPinterest('http://www.pinterest.com/selfhostedlife/pins/', 'selfhostedlife');
  testPinterest('http://pinterest.com/selfhostedlife/pins/', 'selfhostedlife');

  testPinterest('https://www.pinterest.com/pin/747949450595818284/', null);
  testPinterest('https://www.pinterest.com/following/', null);

  assertUtil.testNotNetwork('example.com', 'Pinterest');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Pinterest');
  assertUtil.testNotNetwork('https://www.example.com/pinterest/my_page_id', 'Pinterest');
  assertUtil.testNotNetwork('http://pinterest.example.com/my_page_id', 'Pinterest');
});
