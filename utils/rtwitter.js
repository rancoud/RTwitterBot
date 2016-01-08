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

Twitter.prototype.setAccessTokenByUser = function (screenName) {
  try {
    var tokenJson = JSON.parse(fs.readFileSync(__dirname + '/../oauth_access_cache/' + screenName + '.tok'));
    for (var i = 0; i < tokenJson.length; i++) {
      if(tokenJson[i].app_name === this.getAppName()) {
        this.setAccessToken(tokenJson[i].access_token_key, tokenJson[i].access_token_secret);
        return;
      }
    }
  } catch (e) {
    log.error('RTwitterBot', 'Access token not found for user %s', screenName);
    process.exit(1);
  }

  log.error('RTwitterBot', 'Access token user %s not usable with app %s', screenName, this.getAppName());
  process.exit(1);
};

// source http://stackoverflow.com/questions/32836850/how-do-you-upload-a-chunked-video-to-twitter-using-node/
Twitter.prototype.sendChunkedVideo = function (filePath, callback) {
  var bufferLength, filePath, finished, fs, oauthCredentials, offset, request, segment_index, theBuffer;

  request = require('request');
  fs = require('fs');
  bufferLength = 1000000;
  theBuffer = new Buffer(bufferLength);
  offset = 0;
  segment_index = 0;
  finished = 0;
  oauthCredentials = {
    consumer_key: this.options.request_options.oauth.consumer_key,
    consumer_secret: this.options.request_options.oauth.consumer_secret,
    token: this.options.request_options.oauth.token,
    token_secret: this.options.request_options.oauth.token_secret
  };

  fs.stat(filePath, function(err, stats) {
    var formData, normalAppendCallback, options;

    formData = {
      command: "INIT",
      media_type: 'video/mp4',
      total_bytes: stats.size
    };
    options = {
      url: 'https://upload.twitter.com/1.1/media/upload.json',
      oauth: oauthCredentials,
      formData: formData
    };

    normalAppendCallback = function(media_id) {
      return function(err, response, body) {
        finished++;

        if (finished === segment_index) {
          options.formData = {
            command: 'FINALIZE',
            media_id: media_id
          };
          request.post(options, function(err, response, body) {
            log.info('RTwitterBot', 'Upload file finalized! (status: %d)', response.statusCode);

            if (callback) {
              callback(media_id);
            }
          });
        }
      };
    };

    request.post(options, function(err, response, body) {
      var media_id;
      media_id = JSON.parse(body).media_id_string;

      fs.open(filePath, 'r', function(err, fd) {
        var bytesRead, data;

        while (offset < stats.size) {
          bytesRead = fs.readSync(fd, theBuffer, 0, bufferLength, null);
          data = bytesRead < bufferLength ? theBuffer.slice(0, bytesRead) : theBuffer;

          options.formData = {
            command: "APPEND",
            media_id: media_id,
            segment_index: segment_index,
            media_data: data.toString('base64')
          };
          request.post(options, normalAppendCallback(media_id));

          offset += bufferLength;
          segment_index++
        }
      });
    });
  });
};

global.RTwitter = Twitter;
