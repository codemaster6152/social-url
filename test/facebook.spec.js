'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('facebook', function () {
  function testFacebook (url, user, expectedUrl) {
    return assertUtil.testNetwork('Facebook', url, user, expectedUrl);
  }

  testFacebook('https://www.facebook.com/', null);

  testFacebook('https://www.facebook.com/my_page_id', 'my_page_id');
  testFacebook('https://www.facebook.com/MY_PAGE_ID', 'MY_PAGE_ID');
  testFacebook('http://www.facebook.com/#!/my_page_id', 'my_page_id');
  testFacebook('//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fmy_page_id&amp;', 'my_page_id', 'http://www.facebook.com/my_page_id');
  testFacebook('http://www.facebook.com/pages/foo/Bar-Url/123456?v=app_555', '123456');
  testFacebook('https://www.facebook.com/123456', '123456');
  testFacebook('https://fr.facebook.com/123456', '123456');
  testFacebook('https://gb-en.facebook.com/123456', '123456');
  testFacebook('http://gb-en.facebook.com/123456', '123456');
  testFacebook('www.facebook.com/pages/123456', '123456', 'https://www.facebook.com/pages/123456');
  testFacebook('facebook.com/pages/123456', '123456', 'https://facebook.com/pages/123456');
  testFacebook('https://www.facebook.com/pages/Ch%C3%A2teau-du-Haut-Koenigsbourg/61160951629', '61160951629');
  testFacebook('https://www.facebook.com/Rehabilitación-España-333019166875998/timeline/', '333019166875998');
  testFacebook(' https://www.facebook.com/hocuto.pokloni', 'hocuto.pokloni', 'https://www.facebook.com/hocuto.pokloni');
  testFacebook('https://www.facebook.com/Drain247', 'Drain247');
  testFacebook('https://connect.facebook.net/et_EE/sdk.js#xfbml=1&version=v2.7&appId=1105941226126557', null);

  assertUtil.testNotNetwork('example.com', 'Facebook');
  assertUtil.testNotNetwork('https://example.com/page_id', 'Facebook');
  assertUtil.testNotNetwork('https://www.example.com/facebook/my_page_id', 'Facebook');
  assertUtil.testNotNetwork('http://facebook.example.com/my_page_id', 'Facebook');
});
