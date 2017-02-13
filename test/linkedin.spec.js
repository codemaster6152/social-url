'use strict';

/* globals describe */

var assertUtil = require('./assertUtil');

describe('linkedin', function () {
  function testLinkedIn (url, user, expectedUrl) {
    return assertUtil.testNetwork('LinkedIn', url, user, expectedUrl);
  }

  testLinkedIn('https://www.linkedin.com/', null);
  testLinkedIn('https://linkedin.com/', null);
  testLinkedIn('http://www.linkedin.com/', null);
  testLinkedIn('linkedin.com/', null);

  testLinkedIn('https://www.linkedin.com/in/my-page-id', 'my-page-id');
  testLinkedIn('https://linkedin.com/in/my-page-id', 'my-page-id');
  testLinkedIn('http://www.linkedin.com/in/my-page-id', 'my-page-id');
  testLinkedIn('linkedin.com/in/my-page-id', 'my-page-id', 'https://linkedin.com/in/my-page-id');

  testLinkedIn('https://www.linkedin.com/in/my_very_long_page_id_which_should_not_be_valid', null);
  testLinkedIn('https://www.linkedin.com/in/my_*invalid*_page_id', null);
  testLinkedIn('https://www.linkedin.com/in/@my-page-id', null);
  testLinkedIn('https://www.linkedin.com/in/my-page-id/recent-activity/', 'my-page-id');

  assertUtil.testNotNetwork('example.com', 'LinkedIn');
  assertUtil.testNotNetwork('https://example.com/page_id', 'LinkedIn');
  assertUtil.testNotNetwork('https://www.example.com/linkedin/my-page-id', 'LinkedIn');
  assertUtil.testNotNetwork('http://linkedin.example.com/my-page-id', 'LinkedIn');
});
