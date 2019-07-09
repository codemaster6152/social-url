'use strict';

/* globals describe */

const assertUtil = require('./assertUtil');

describe('foursquare', function () {
  function testFoursquare (url, user, expectedUrl) {
    return assertUtil.testNetwork('Foursquare', url, user, expectedUrl);
  }

  testFoursquare('https://foursquare.com', null);

  testFoursquare('https://foursquare.com/v/central-park/412d2800f964a520df0c1fe3', '412d2800f964a520df0c1fe3');
  testFoursquare('https://foursquare.com/v/412d2800f964a520df0c1fe3', '412d2800f964a520df0c1fe3');
  testFoursquare('https://www.foursquare.com/v/central-park/412d2800f964a520df0c1fe3', '412d2800f964a520df0c1fe3');
  testFoursquare('https://www.foursquare.com/v/412d2800f964a520df0c1fe3', '412d2800f964a520df0c1fe3');
  testFoursquare('foursquare.com/v/412d2800f964a520df0c1fe3', '412d2800f964a520df0c1fe3', 'https://foursquare.com/v/412d2800f964a520df0c1fe3');
  testFoursquare('https://foursquare.com/serveratwork', 'serveratwork');

  testFoursquare('https://foursquare.com/explore?cat=topPicks&mode=url&near=Lake%20Charles%2C%20LA%2C%20United%20States&nearGeoId=72057594042258172', null);

  assertUtil.testNotNetwork('https://not-foursquare.com/v/412d2800f964a520df0c1fe3', 'Foursquare');
});
