'use strict';

const urlUtil = require('url');
const tld = require('tldjs');

const GPLUS_LINKS_PATTERN1 = /\/.*(\+[^/]+)/i;
const GPLUS_LINKS_PATTERN2 = /(?:\/u\/\d+(?:\/b)?)?\/([0-9]+)/i;
const TWITTER_LINKS_PATTERN = /\/@?([a-zA-Z0-9_]{1,15})/i;
const YELP_LINKS_PATTERN = /^\/biz\/([^/]+)/i;
const FOURSQUARE_LINKS_PATTERN = /^(?:\/v)?\/([^/]+)(?:\/([^/]+))?/i;
const INSTAGRAM_LINKS_PATTERN = /^\/([a-zA-Z0-9_.]{1,30})(\/.*)*$/i;
const SOUNDCLOUD_LINKS_PATTERN = /^\/([a-zA-Z0-9_]{3,255})(\/.*)*$/i;
const YOUTUBE_LINKS_PATTERN = /^(\/user\/|\/c\/|\/channel\/|\/)([a-zA-Z0-9_]{5,50}(?=(\/|$)))/i;
const LINKEDIN_LINKS_PATTERN = /\/(in|company)\/([a-z0-9-]{1,30})(\/.*)*$/i;
const CRUNCHBASE_LINKS_PATTERN = /\/organizations?\/([a-z0-9-]{1,50})(\/.*)*$/i;
const MYSPACE_LINKS_PATTERN = /^\/([a-zA-Z0-9_.]{1,50})(\/.*)*$/i;
const PINTEREST_LINKS_PATTERN = /^\/([a-zA-Z0-9_.]{1,50})(\/.*)*$/i;
const REDDIT_LINKS_PATTERN = /^(\/user\/|\/u\/)([a-z0-9-]{1,50})(\/.*)*$/i;
const VIMEO_LINKS_PATTERN = /^\/([a-zA-Z0-9_.]{1,50})(\/.*)*$/i;

const TWITTER_RESERVED_KEYWORDS = ['hashtag', 'search'];
const YOUTUBE_RESERVED_KEYWORDS = ['watch'];
const INSTAGRAM_RESERVED_KEYWORDS = ['p', 'explore'];
const FOURSQUARE_RESERVED_KEYWORDS = ['explore'];
const MYSPACE_RESERVED_KEYWORDS = ['discover', 'article', 'articles'];
const PINTEREST_RESERVED_KEYWORDS = ['pin', 'following'];
const VIMEO_RESERVED_KEYWORDS = ['features', 'watch', 'search'];
const FACEBOOK_RESERVED_KEYWORDS = ['profile.php'];

function parseGooglePlus (url) {
  const match = (
    GPLUS_LINKS_PATTERN1.exec(url.pathname) ||
    GPLUS_LINKS_PATTERN2.exec(url.pathname)
  );

  const user = match ? decodeURIComponent(match[1]) : null;

  return {
    network: 'Google+',
    user: user,
    url: url.href
  };
}

function parseTwitter (url) {
  const pathname = /^#!\//.test(url.hash) ? url.hash.substr(2) : url.pathname;
  const match = TWITTER_LINKS_PATTERN.exec(pathname);
  let user = match ? match[1] : null;
  if (TWITTER_RESERVED_KEYWORDS.includes(user)) {
    user = null;
  }

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
  let path = url.pathname;

  if (url.pathname === '/' && url.hash) {
    path = url.hash.replace(/^#!/, '');
  }

  const parts = path.split('/').filter(function (x) { return x; });
  let user = null;
  let part = null;

  while (parts.length > 0) {
    part = parts.pop();
    const match = /^(?:.+-)?(\d+)$/.exec(part);
    if (match) {
      user = match[1];
      break;
    }
  }

  if (!user) {
    user = part;
  }

  const { query } = url;
  if (query && query.id && FACEBOOK_RESERVED_KEYWORDS.includes(user)) {
    user = query.id;
  }

  return {
    network: 'Facebook',
    user: user,
    url: url.href
  };
}

function parseYelp (url) {
  const match = YELP_LINKS_PATTERN.exec(url.pathname);
  const user = match ? match[1] : null;

  return {
    network: 'Yelp',
    user: user,
    url: url.href
  };
}

function parseFoursquare (url) {
  const match = FOURSQUARE_LINKS_PATTERN.exec(url.pathname);
  let user = match ? (match[2] || match[1]) : null;
  if (FOURSQUARE_RESERVED_KEYWORDS.includes(user)) {
    user = null;
  }

  return {
    network: 'Foursquare',
    user: user,
    url: url.href
  };
}

function parseInstagram (url) {
  const match = INSTAGRAM_LINKS_PATTERN.exec(url.pathname);
  let user = match ? match[1] : null;
  if (INSTAGRAM_RESERVED_KEYWORDS.includes(user)) {
    user = null;
  }

  return {
    network: 'Instagram',
    user: user,
    url: url.href
  };
}

function parseSoundCloud (url) {
  const match = SOUNDCLOUD_LINKS_PATTERN.exec(url.pathname);
  const user = match ? match[1] : null;

  return {
    network: 'SoundCloud',
    user: user,
    url: url.href
  };
}

function parseYouTube (url) {
  const match = YOUTUBE_LINKS_PATTERN.exec(url.pathname);
  let user = match ? match[2] : null;
  if (YOUTUBE_RESERVED_KEYWORDS.includes(user)) {
    user = null;
  }

  return {
    network: 'YouTube',
    user: user,
    url: url.href
  };
}

function parseLinkedIn (url) {
  const match = LINKEDIN_LINKS_PATTERN.exec(url.pathname);
  const user = match ? match[2] : null;

  return {
    network: 'LinkedIn',
    user: user,
    url: url.href
  };
}

function parseCrunchbase (url) {
  const match = CRUNCHBASE_LINKS_PATTERN.exec(url.pathname);
  const user = match ? match[1] : null;

  return {
    network: 'Crunchbase',
    user: user,
    url: url.href
  };
}

function parseMySpace (url) {
  const match = MYSPACE_LINKS_PATTERN.exec(url.pathname);
  let user = match ? match[1] : null;
  if (MYSPACE_RESERVED_KEYWORDS.includes(user)) {
    user = null;
  }

  return {
    network: 'MySpace',
    user: user,
    url: url.href
  };
}

function parsePinterest (url) {
  const match = PINTEREST_LINKS_PATTERN.exec(url.pathname);
  let user = match ? match[1] : null;
  if (PINTEREST_RESERVED_KEYWORDS.includes(user)) {
    user = null;
  }

  return {
    network: 'Pinterest',
    user: user,
    url: url.href
  };
}

function parseTumblr (url, subdomain) {
  let user = null;
  if (subdomain !== '' && subdomain !== 'www') {
    user = subdomain.startsWith('www.') ? subdomain.substring(4) : subdomain;
  }

  return {
    network: 'Tumblr',
    user: user,
    url: url.href
  };
}

function parseReddit (url) {
  const match = REDDIT_LINKS_PATTERN.exec(url.pathname);
  const user = match ? match[2] : null;

  return {
    network: 'Reddit',
    user: user,
    url: url.href
  };
}

function parseVimeo (url) {
  const match = VIMEO_LINKS_PATTERN.exec(url.pathname);
  let user = match ? match[1] : null;
  if (VIMEO_RESERVED_KEYWORDS.includes(user)) {
    user = null;
  }

  if (user && /^\d+$/.test(user)) {
    user = null;
  }

  return {
    network: 'Vimeo',
    user: user,
    url: url.href
  };
}

const DEFAULT = { network: null, user: null, url: null };

function parse (url) {
  if (typeof url !== 'string') {
    return DEFAULT;
  }

  url = url.trim().replace(/^\/+/, '');
  if (!/^https?:\/\//.test(url)) {
    url = 'https://' + url;
  }

  const parsed = urlUtil.parse(url, true);
  const hostname = parsed.hostname;

  if (!hostname) {
    return DEFAULT;
  }

  const domain = tld.getDomain(hostname);

  if (!domain) {
    return DEFAULT;
  }

  const subdomain = tld.getSubdomain(hostname);
  const domainName = domain.split('.')[0];

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
  } else if (domainName === 'crunchbase') {
    return parseCrunchbase(parsed);
  } else if (domainName === 'myspace') {
    return parseMySpace(parsed);
  } else if (domainName === 'pinterest') {
    return parsePinterest(parsed);
  } else if (domainName === 'tumblr') {
    return parseTumblr(parsed, subdomain);
  } else if (domainName === 'reddit') {
    return parseReddit(parsed);
  } else if (domainName === 'vimeo') {
    return parseVimeo(parsed);
  }

  return { network: null, user: null, url: parsed.href };
}

module.exports = {
  parse: parse
};
