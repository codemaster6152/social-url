'use strict';

/* globals describe */

const assertUtil = require('./assertUtil');

describe('yelp', function () {
  function testYelp (url, user, expectedUrl) {
    return assertUtil.testNetwork('Yelp', url, user, expectedUrl);
  }

  testYelp('http://www.yelp.com/', null);
  testYelp('http://www.yelp.com/bruxelles', null);

  testYelp('https://yelp.com/biz/the-place', 'the-place');
  testYelp('https://www.yelp.com/biz/the-place', 'the-place');
  testYelp('http://yelp.com/biz/the-place', 'the-place');
  testYelp('yelp.com/biz/the-place', 'the-place', 'https://yelp.com/biz/the-place');
  testYelp('www.yelp.com/biz/the-place', 'the-place', 'https://www.yelp.com/biz/the-place');

  // all hreflangs
  testYelp('http://en.yelp.be/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.fr/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.ca/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://fi.yelp.fi/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.pt/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://fr.yelp.ch/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.it/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://nl.yelp.be/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://nz.yelp.com/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.nl/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.com/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.com.sg/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://en.yelp.com.hk/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.com.au/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://fr.yelp.be/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://de.yelp.ch/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.cl/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.co.jp/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.at/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.com.ar/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.es/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.co.uk/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://en.yelp.com.ph/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://zh.yelp.com.hk/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://fil.yelp.com.ph/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.com.br/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://en.yelp.ch/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.dk/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.com.tw/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.cz/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://ms.yelp.my/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://en.yelp.my/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.com.tr/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.ie/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.de/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.com.mx/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://sv.yelp.fi/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://fr.yelp.ca/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.se/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://it.yelp.ch/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.pl/biz/comocomo-bruxelles', 'comocomo-bruxelles');
  testYelp('http://www.yelp.no/biz/comocomo-bruxelles', 'comocomo-bruxelles');

  assertUtil.testNotNetwork('https://not-yelp.com/biz/', 'Yelp');
});
