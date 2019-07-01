'use strict';

/* globals describe */

const assertUtil = require('./assertUtil');

describe('crunchbase', function () {
  function testCrunchbase (url, user, expectedUrl) {
    return assertUtil.testNetwork('Crunchbase', url, user, expectedUrl);
  }

  testCrunchbase('https://www.crunchbase.com/', null);
  testCrunchbase('https://crunchbase.com/', null);
  testCrunchbase('http://www.crunchbase.com/', null);
  testCrunchbase('http://crunchbase.com/', null);
  testCrunchbase('crunchbase.com/', null);

  testCrunchbase('https://www.crunchbase.com/organization/woorank', 'woorank');
  testCrunchbase('https://crunchbase.com/organization/woorank', 'woorank');
  testCrunchbase('http://www.crunchbase.com/organization/woorank', 'woorank');
  testCrunchbase('http://crunchbase.com/organization/woorank', 'woorank');
  testCrunchbase('crunchbase.com/organization/woorank', 'woorank', 'https://crunchbase.com/organization/woorank');

  testCrunchbase('https://www.crunchbase.com/organization/yg-entertainment', 'yg-entertainment');
  testCrunchbase('https://crunchbase.com/organization/yg-entertainment', 'yg-entertainment');
  testCrunchbase('http://www.crunchbase.com/organization/yg-entertainment', 'yg-entertainment');
  testCrunchbase('http://crunchbase.com/organization/yg-entertainment', 'yg-entertainment');
  testCrunchbase('crunchbase.com/organization/yg-entertainment', 'yg-entertainment', 'https://crunchbase.com/organization/yg-entertainment');

  testCrunchbase('https://www.crunchbase.com/organization/', null);
  testCrunchbase('https://crunchbase.com/organization/', null);
  testCrunchbase('http://www.crunchbase.com/organization/', null);
  testCrunchbase('http://crunchbase.com/organization/', null);
  testCrunchbase('crunchbase.com/organization/', null);

  testCrunchbase('https://www.crunchbase.com/organization/woorank#section-overview', 'woorank');
  testCrunchbase('https://crunchbase.com/organization/woorank#section-overview', 'woorank');
  testCrunchbase('http://www.crunchbase.com/organization/woorank#section-overview', 'woorank');
  testCrunchbase('http://crunchbase.com/organization/woorank#section-overview', 'woorank');

  testCrunchbase('https://www.crunchbase.com/woorank/', null);
  testCrunchbase('https://crunchbase.com/woorank/', null);
  testCrunchbase('http://www.crunchbase.com/woorank/', null);
  testCrunchbase('http://crunchbase.com/woorank/', null);
  testCrunchbase('crunchbase.com/woorank/', null);

  testCrunchbase('https://www.crunchbase.com/person/woorank', null);
  testCrunchbase('https://www.crunchbase.com/hub/woorank', null);

  assertUtil.testNotNetwork('example.com', 'Crunchbase');
  assertUtil.testNotNetwork('https://example.com/organization/woorank', 'Crunchbase');
  assertUtil.testNotNetwork('https://www.example.com/organization/woorank', 'Crunchbase');
});
