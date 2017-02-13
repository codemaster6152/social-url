'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('soundcloud', function () {
  function testSoundCloud (url, user, expectedUrl) {
    return assertUtil.testNetwork('SoundCloud', url, user, expectedUrl);
  }

  testSoundCloud('https://www.soundcloud.com/', null);
  testSoundCloud('https://soundcloud.com/', null);
  testSoundCloud('http://soundcloud.com/', null);
  testSoundCloud('soundcloud.com/', null);

  testSoundCloud('https://www.soundcloud.com/my_page_id', 'my_page_id');
  testSoundCloud('https://soundcloud.com/my_page_id', 'my_page_id');
  testSoundCloud('http://soundcloud.com/my_page_id', 'my_page_id');
  testSoundCloud('soundcloud.com/my_page_id', 'my_page_id', 'https://soundcloud.com/my_page_id');

  testSoundCloud('https://www.soundcloud.com/my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_my_very_long_page_id_which_should_not_be_valid_', null);
  testSoundCloud('https://www.soundcloud.com/my_*invalid*_page_id', null);
  testSoundCloud('https://www.soundcloud.com/@my_page_id', null);
  testSoundCloud('https://www.soundcloud.com/my_page_id/tracks', 'my_page_id');

  assertUtil.testNotNetwork('example.com', 'SoundCloud');
  assertUtil.testNotNetwork('https://example.com/page_id', 'SoundCloud');
  assertUtil.testNotNetwork('https://www.example.com/soundcloud/my_page_id', 'SoundCloud');
  assertUtil.testNotNetwork('http://soundcloud.example.com/my_page_id', 'SoundCloud');
});
