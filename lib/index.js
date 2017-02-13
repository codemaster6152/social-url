'use strict';

var urlUtil = require('url');
var tld = require('tldjs');

var GPLUS_LINKS_PATTERN1 = /\/.*(\+[^\/]+)/i;
var GPLUS_LINKS_PATTERN2 = /(?:\/u\/\d+(?:\/b)?)?\/([0-9]+)/i;
var TWITTER_LINKS_PATTERN = /\/@?([a-zA-Z0-9_]{1,15})/i;
var YELP_LINKS_PATTERN = /^\/biz\/([^/]+)/i;
var FOURSQUARE_LINKS_PATTERN = /^(?:\/v)?\/([^/]+)(?:\/([^/]+))?/i;
var INSTAGRAM_LINKS_PATTERN = /^\/([a-zA-Z0-9_]{1,30})(\/.*)*$/i;
var SOUNDCLOUD_LINKS_PATTERN = /^\/([a-zA-Z0-9_]{3,255})(\/.*)*$/i;
var YOUTUBE_LINKS_PATTERN = /^(\/user\/|\/c\/|\/channel\/|\/)([a-zA-Z0-9_]{5,50}(?=(\/|$)))/i;
var LINKEDIN_LINKS_PATTERN = /\/in\/([a-z0-9\-]{5,30})(\/.*)*$/i;

function parseGooglePlus (url) {
  var match = (
    GPLUS_LINKS_PATTERN1.exec(url.pathname) ||
    GPLUS_LINKS_PATTERN2.exec(url.pathname)
  );

  var user = match && decodeURIComponent(match[1]) || null;

  return {
    network: 'Google+',
    user: user,
    url: url.href
  };
}

function parseTwitter (url) {
  var pathname = /^#!\//.test(url.hash) ? url.hash.substr(2) : url.pathname;
  var match = TWITTER_LINKS_PATTERN.exec(pathname);
  var user = match && match[1] || null;
  if (user) {
    user = user.toLowerCase();
  }

  return {
    network: 'Twitter',
    user: user,
    url: url.href
  };
}

function parseFacebook (url) {
  var path = url.pathname;

  if (url.pathname === '/' && url.hash) {
    path = url.hash.replace(/^#!/, '');
  }

  var parts = path.split('/').filter(function (x) { return x; });
  var user = null;
  var part = null;

  while (parts.length > 0) {
    part = parts.pop();
    var match = /^(?:.+-)?(\d+)$/.exec(part);
    if (match) {
      user = match[1];
      break;
    }
  }

  if (!user) {
    user = part;
  }

  return {
    network: 'Facebook',
    user: user,
    url: url.href
  };
}

function parseYelp (url) {
  var match = YELP_LINKS_PATTERN.exec(url.pathname);
  var user = match && match[1] || null;

  return {
    network: 'Yelp',
    user: user,
    url: url.href
  };
}

function parseFoursquare (url) {
  var match = FOURSQUARE_LINKS_PATTERN.exec(url.pathname);
  var user = match && (match[2] || match[1]) || null;

  return {
    network: 'Foursquare',
    user: user,
    url: url.href
  };
}

function parseInstagram (url) {
  var match = INSTAGRAM_LINKS_PATTERN.exec(url.pathname);
  var user = match && match[1] || null;

  return {
    network: 'Instagram',
    user: user,
    url: url.href
  };
}

function parseSoundCloud (url) {
  var match = SOUNDCLOUD_LINKS_PATTERN.exec(url.pathname);
  var user = match && match[1] || null;

  return {
    network: 'SoundCloud',
    user: user,
    url: url.href
  };
}

function parseYouTube (url) {
  var match = YOUTUBE_LINKS_PATTERN.exec(url.pathname);
  var user = match && match[2] || null;

  return {
    network: 'YouTube',
    user: user,
    url: url.href
  };
}

function parseLinkedIn (url) {
  var match = LINKEDIN_LINKS_PATTERN.exec(url.pathname);
  var user = match && match[1] || null;

  return {
    network: 'LinkedIn',
    user: user,
    url: url.href
  };
}

var DEFAULT = { network: null, user: null, url: null };

function parse (url) {
  if (typeof url !== 'string') {
    return DEFAULT;
  }

  url = url.trim().replace(/^\/+/, '');
  if (!/^https?:\/\//.test(url)) {
    url = 'https://' + url;
  }

  var parsed = urlUtil.parse(url, true);
  var hostname = parsed.hostname;

  if (!hostname) {
    return DEFAULT;
  }

  var domain = tld.getDomain(hostname);

  if (!domain) {
    return DEFAULT;
  }

  var subdomain = tld.getSubdomain(hostname);
  var domainName = domain.split('.')[0];

  if (domainName === 'google' && (subdomain === 'plus' || subdomain === 'www')) {
    return parseGooglePlus(parsed);
  } else if (domainName === 'twitter') {
    return parseTwitter(parsed);
  } else if (domainName === 'facebook') {
    if (/^\/plugins/.test(parsed.pathname) && parsed.query.href) {
      return parseFacebook(urlUtil.parse(parsed.query.href));
    }
    return parseFacebook(parsed);
  } else if (domainName === 'yelp') {
    return parseYelp(parsed);
  } else if (domainName === 'foursquare') {
    return parseFoursquare(parsed);
  } else if (domainName === 'instagram') {
    return parseInstagram(parsed);
  } else if (domainName === 'soundcloud') {
    return parseSoundCloud(parsed);
  } else if (domainName === 'youtube') {
    return parseYouTube(parsed);
  } else if (domainName === 'linkedin') {
    return parseLinkedIn(parsed);
  }

  return { network: null, user: null, url: parsed.href };
}

module.exports = {
  parse: parse
};
