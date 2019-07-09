'use strict';

/* globals describe */

const assertUtil = require('./assertUtil');

describe('myspace', function () {
  function testMySpace (url, user, expectedUrl) {
    return assertUtil.testNetwork('MySpace', url, user, expectedUrl);
  }

  testMySpace('https://www.myspace.com/', null);
  testMySpace('https://myspace.com/', null);
  testMySpace('http://myspace.com/', null);
  testMySpace('myspace.com/', null);

  testMySpace('https://myspace.com/blakeshelton', 'blakeshelton');
  testMySpace('https://www.myspace.com/blakeshelton', 'blakeshelton');
  testMySpace('http://myspace.com/blakeshelton', 'blakeshelton');
  testMySpace('http://www.myspace.com/blakeshelton', 'blakeshelton');
  testMySpace('myspace.com/blakeshelton', 'blakeshelton', 'https://myspace.com/blakeshelton');

  testMySpace('https://myspace.com/article/2019/7/8/spider-man-far-from-home-takes-in-252-million-over-july-4th-holiday-ew', null);
  testMySpace('https://myspace.com/articles/news', null);
  testMySpace('https://myspace.com/discover/songs', null);
  testMySpace('https://www.myspace.com/discover/songs', null);
  testMySpace('http://myspace.com/discover/songs', null);
  testMySpace('http://www.myspace.com/discover/songs', null);

  assertUtil.testNotNetwork('example.com', 'MySpace');
  assertUtil.testNotNetwork('https://example.com/page_id', 'MySpace');
  assertUtil.testNotNetwork('https://www.example.com/myspace/my_page_id', 'MySpace');
  assertUtil.testNotNetwork('http://myspace.example.com/my_page_id', 'MySpace');
});
