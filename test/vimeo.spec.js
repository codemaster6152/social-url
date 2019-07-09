'use strict';

/* globals describe */

const assertUtil = require('./assertUtil');

describe('vimeo', function () {
  function testVimeo (url, user, expectedUrl) {
    return assertUtil.testNetwork('Vimeo', url, user, expectedUrl);
  }

  testVimeo('https://www.vimeo.com/', null);
  testVimeo('https://vimeo.com/', null);
  testVimeo('http://www.vimeo.com/', null);
  testVimeo('http://vimeo.com/', null);
  testVimeo('vimeo.com/', null);

  testVimeo('https://www.vimeo.com/davidtart/', 'davidtart');
  testVimeo('https://vimeo.com/davidtart/', 'davidtart');
  testVimeo('http://www.vimeo.com/davidtart/', 'davidtart');
  testVimeo('http://vimeo.com/davidtart/', 'davidtart');

  testVimeo('https://www.vimeo.com/davidtart/about/', 'davidtart');
  testVimeo('https://vimeo.com/davidtart/about/', 'davidtart');
  testVimeo('http://www.vimeo.com/davidtart/about/', 'davidtart');
  testVimeo('http://vimeo.com/davidtart/about/', 'davidtart');

  testVimeo('https://vimeo.com/search?q=hello', null);
  testVimeo('https://vimeo.com/features/video-player', null);
  testVimeo('https://vimeo.com/watch', null);
  testVimeo('https://vimeo.com/12345', null);

  assertUtil.testNotNetwork('example.com', 'Vimeo');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Vimeo');
  assertUtil.testNotNetwork('https://www.example.com/vimeo/my_page_id', 'Vimeo');
  assertUtil.testNotNetwork('http://vimeo.example.com/my_page_id', 'Vimeo');
});
