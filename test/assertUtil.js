'use strict';

/* globals it */

const socialUrl = require('..');
const assert = require('assert');

function testNotNetwork (url, network) {
  it('shouldn\'t categorize "' + url + '" as "' + network + '"', function () {
    var parsed = socialUrl.parse(url);
    assert.notStrictEqual(parsed.network, network);
  });
}

function testNetwork (network, url, user, expectedUrl) {
  if (user) {
    it('should find "' + user + '" in "' + url + '"', function () {
      var parsed = socialUrl.parse(url);
      assert.strictEqual(parsed.network, network);
      assert.strictEqual(parsed.user, user);
      if (expectedUrl) {
        assert.strictEqual(parsed.url, expectedUrl);
      } else {
        assert.strictEqual(parsed.url, url);
      }
    });
  } else {
    it('shouldn\'t find a user in "' + url + '"', function () {
      var parsed = socialUrl.parse(url);
      assert.strictEqual(parsed.network, network);
      assert(!parsed.user);
    });
  }
}

module.exports = {
  testNetwork: testNetwork,
  testNotNetwork: testNotNetwork
};
