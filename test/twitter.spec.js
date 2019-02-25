'use strict';

/* globals describe */

const assertUtil = require('./assertUtil');

describe('twitter', function () {
  function testTwitter (url, user, expectedUrl) {
    return assertUtil.testNetwork('Twitter', url, user, expectedUrl);
  }

  testTwitter('https://twitter.com', null);

  testTwitter('https://twitter.com/woorank', 'woorank');
  testTwitter('https://twitter.com/@woorank', 'woorank');
  testTwitter('https://twitter.com/WOORANK', 'woorank');
  testTwitter('https://www.twitter.com/woorank', 'woorank');
  testTwitter('https://www.twitter.com/woorank/lists', 'woorank');
  testTwitter('twitter.com/woorank', 'woorank', 'https://twitter.com/woorank');
  testTwitter('www.twitter.com/woorank', 'woorank', 'https://www.twitter.com/woorank');
  testTwitter(' https://twitter.com/hocuto_srbija', 'hocuto_srbija', 'https://twitter.com/hocuto_srbija');
  testTwitter('https://twitter.com/#!/DalbarInc', 'dalbarinc');

  assertUtil.testNotNetwork('https://not-twitter.com/woorank', 'Twitter');
});
