'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('instagram', function () {
  function testInstagram (url, user, expectedUrl) {
    return assertUtil.testNetwork('Instagram', url, user, expectedUrl);
  }

  testInstagram('https://www.instagram.com/', null);
  testInstagram('https://instagram.com/', null);
  testInstagram('http://www.instagram.com/', null);
  testInstagram('instagram.com/', null);

  testInstagram('https://www.instagram.com/my_page_id', 'my_page_id');
  testInstagram('https://instagram.com/my_page_id', 'my_page_id');
  testInstagram('http://www.instagram.com/my_page_id', 'my_page_id');
  testInstagram('instagram.com/my_page_id', 'my_page_id', 'https://instagram.com/my_page_id');

  testInstagram('https://www.instagram.com/my_very_long_page_id_which_should_not_be_valid', null);
  testInstagram('https://www.instagram.com/my_*invalid*_page_id', null);
  testInstagram('https://www.instagram.com/@my_page_id', null);
  testInstagram('https://www.instagram.com/my_page_id/following', 'my_page_id');

  assertUtil.testNotNetwork('example.com', 'Instagram');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Instagram');
  assertUtil.testNotNetwork('https://www.example.com/instagram/my_page_id', 'Instagram');
  assertUtil.testNotNetwork('http://instagram.example.com/my_page_id', 'Instagram');
});
