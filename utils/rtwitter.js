var Twitter = require('twitter');

Twitter.prototype.getAuthUrl = function(callback) {
    var callbackUrl = this.options.callback_url;

    var OAuth = require('oauth').OAuth
        , oauth = new OAuth(
            "https://api.twitter.com/oauth/request_token",
            "https://api.twitter.com/oauth/access_token",
            this.options.consumer_key,
            this.options.consumer_secret,
            "1.0",
            callbackUrl,
            "HMAC-SHA1"
        );

    oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
        if (error) {
            callback(false);
        }
        else {
            callback({
                'url': 'https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token,
                'oauth_token': oauth_token,
                'oauth_token_secret': oauth_token_secret
            });
        }
    });
};

Twitter.prototype.authenticate = function(oauth_token, oauth_token_secret, oauth_verifier, cb) {
    var OAuth = require('oauth').OAuth
        , oauth = new OAuth(
            "https://api.twitter.com/oauth/request_token",
            "https://api.twitter.com/oauth/access_token",
            this.options.consumer_key,
            this.options.consumer_secret,
            "1.0",
            '',
            "HMAC-SHA1"
        );

    oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier, function(err, access_token, access_secret) {
        if (err) {
          console.log(err);
            cb(false);
        } else {
            cb({
                access_token_key: access_token,
                access_token_secret: access_secret
            });
        }

    });
};

Twitter.prototype.resetAccessToken = function () {
  this.options.access_token_key = null;
  this.options.access_token_secret = null;
  this.options.request_options.oauth.token = null;
  this.options.request_options.oauth.token_secret = null;
};

Twitter.prototype.setAccessToken = function (token, secret) {
  this.options.access_token_key = token;
  this.options.access_token_secret = secret;
  this.options.request_options.oauth.token = token;
  this.options.request_options.oauth.token_secret = secret;
};

Twitter.prototype.getAppName = function () {
  return this.options.name;
};

global.RTwitter = Twitter;
