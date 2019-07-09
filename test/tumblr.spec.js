'use strict';

/* globals describe */

const assertUtil = require('./assertUtil');

describe('tumblr', function () {
  function testTumblr (url, user, expectedUrl) {
    return assertUtil.testNetwork('Tumblr', url, user, expectedUrl);
  }

  testTumblr('https://www.tumblr.com/', null);
  testTumblr('https://tumblr.com/', null);
  testTumblr('http://www.tumblr.com/', null);
  testTumblr('http://tumblr.com/', null);
  testTumblr('tumblr.com/', null);

  testTumblr('https://www.hello.tumblr.com/', 'hello');
  testTumblr('https://hello.tumblr.com/', 'hello');
  testTumblr('http://www.hello.tumblr.com/', 'hello');
  testTumblr('http://hello.tumblr.com/', 'hello');

  assertUtil.testNotNetwork('example.com', 'Tumblr');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Tumblr');
  assertUtil.testNotNetwork('https://www.example.com/tumblr/my_page_id', 'Tumblr');
  assertUtil.testNotNetwork('http://tumblr.example.com/my_page_id', 'Tumblr');
});
