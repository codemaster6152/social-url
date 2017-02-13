'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('youtube', function () {
  function testYouTube (url, user, expectedUrl) {
    return assertUtil.testNetwork('YouTube', url, user, expectedUrl);
  }

  testYouTube('https://www.youtube.com/', null);
  testYouTube('https://youtube.com/', null);
  testYouTube('http://youtube.com/', null);
  testYouTube('youtube.com/', null);

  testYouTube('https://www.youtube.com/my_page_id', 'my_page_id');
  testYouTube('https://youtube.com/my_page_id', 'my_page_id');
  testYouTube('http://youtube.com/my_page_id', 'my_page_id');
  testYouTube('youtube.com/my_page_id', 'my_page_id', 'https://youtube.com/my_page_id');

  testYouTube('https://www.youtube.com/c/my_page_id', 'my_page_id');
  testYouTube('https://youtube.com/c/my_page_id', 'my_page_id');
  testYouTube('http://youtube.com/c/my_page_id', 'my_page_id');
  testYouTube('youtube.com/c/my_page_id', 'my_page_id', 'https://youtube.com/c/my_page_id');

  testYouTube('https://www.youtube.com/channel/my_page_id', 'my_page_id');
  testYouTube('https://youtube.com/channel/my_page_id', 'my_page_id');
  testYouTube('http://youtube.com/channel/my_page_id', 'my_page_id');
  testYouTube('youtube.com/channel/my_page_id', 'my_page_id', 'https://youtube.com/channel/my_page_id');

  testYouTube('https://www.youtube.com/user/my_page_id', 'my_page_id');
  testYouTube('https://youtube.com/user/my_page_id', 'my_page_id');
  testYouTube('http://youtube.com/user/my_page_id', 'my_page_id');
  testYouTube('youtube.com/user/my_page_id', 'my_page_id', 'https://youtube.com/user/my_page_id');

  testYouTube('https://www.youtube.com/user/my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid', null);
  testYouTube('https://www.youtube.com/user/my_*invalid*_page_id', null);
  testYouTube('https://www.youtube.com/user/@my_page_id', null);
  testYouTube('https://www.youtube.com/user/my_page_id/videos', 'my_page_id');

  assertUtil.testNotNetwork('example.com', 'YouTube');
  assertUtil.testNotNetwork('https://example.com/page_id', 'YouTube');
  assertUtil.testNotNetwork('https://www.example.com/youtube/my_page_id', 'YouTube');
  assertUtil.testNotNetwork('http://youtube.example.com/my_page_id', 'YouTube');
});
