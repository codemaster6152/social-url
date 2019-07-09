'use strict';

/* globals describe */

const assertUtil = require('./assertUtil');

describe('reddit', function () {
  function testReddit (url, user, expectedUrl) {
    return assertUtil.testNetwork('Reddit', url, user, expectedUrl);
  }

  testReddit('https://www.reddit.com/', null);
  testReddit('https://reddit.com/', null);
  testReddit('http://www.reddit.com/', null);
  testReddit('http://reddit.com/', null);
  testReddit('reddit.com/', null);

  testReddit('https://www.reddit.com/u/hello', 'hello');
  testReddit('https://reddit.com/u/hello', 'hello');
  testReddit('http://www.reddit.com/u/hello', 'hello');
  testReddit('http://reddit.com/u/hello', 'hello');

  testReddit('https://www.reddit.com/user/hello', 'hello');
  testReddit('https://reddit.com/user/hello', 'hello');
  testReddit('http://www.reddit.com/user/hello', 'hello');
  testReddit('http://reddit.com/user/hello', 'hello');

  testReddit('https://www.reddit.com/r/hello', null);
  testReddit('https://reddit.com/r/hello', null);
  testReddit('http://www.reddit.com/r/hello', null);
  testReddit('http://reddit.com/r/hello', null);

  assertUtil.testNotNetwork('example.com', 'Reddit');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Reddit');
  assertUtil.testNotNetwork('https://www.example.com/reddit/my_page_id', 'Reddit');
  assertUtil.testNotNetwork('http://reddit.example.com/my_page_id', 'Reddit');
});
