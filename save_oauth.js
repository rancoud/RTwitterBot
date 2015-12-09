// require all files in utils folder
colors = require('colors');
util = require('util');
fs = require('fs');
fs.readdirSync(__dirname + '/utils/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    require(__dirname + '/utils/' + file);
  }
});

// init variables
globalUser = globalApp = null;
options = [];
authData = {};

// init logger
log = require('npmlog');
log.info('RTwitterBot SaveOauth', 'Init');

// get options
process.argv.forEach(function (val, index, array) {
  if(index > 1) {
    options.push(val);
  }
});

// get general options
var _tmpOptions = [];
for (var i = 0, max = options.length; i < max; i++) {
  if(options[i] === '-a' || options[i] === '--app') {
    i++;
    if(i < max) {
      globalApp = options[i];
    }
    else {
      log.error('RTwitterBot', 'app argument missing!');
      return;
    }
  }
  else {
    _tmpOptions.push(options[i]);
  }
}
options = _tmpOptions;

// get twitter app configurations
confTwitterApp = require(__dirname + '/conf.twitter.app.js');

// check confTwitterApp > not empty AND no duplicate name
if(confTwitterApp.length === 0) {
  log.error('RTwitterBot', 'File conf.twitter.app.js is empty');
  process.exit(1);
}
var _names = [];
var ready = confTwitterApp.length;
for (var i = 0; i < confTwitterApp.length; i++) {
  if(_names.indexOf(confTwitterApp[i].name) !== -1) {
    log.error('RTwitterBot', 'Duplicate names in file conf.twitter.app.js');
    process.exit(1);
  }
  _names.push(confTwitterApp[i].name);
}

if(options[0] !== undefined) {
  client = getTwitterApp(options[0]);
}
else {
  client = getTwitterApp();
}

// setup server
http = require('http');
server = http.createServer(function (req, res) {
  if(req.url === '/') {
    client.getAuthUrl(function(oauthData){
      log.info('RTwitterBot SaveOauth', 'Generate authentification url %s', oauthData.url);
      authData = oauthData;
      res.writeHead(302, {'Location': oauthData.url});
      res.end();
      return;
    });
  }
  else {
    var query = require('url').parse(req.url, true).query;
    if(query.oauth_token === undefined || query.oauth_verifier === undefined) {
      return;
    }

    client.resetAccessToken();

    client.authenticate(query.oauth_token, authData.oauth_token_secret, query.oauth_verifier, function(accessToken) {
      if(accessToken !== false) {
        accessToken.app_name = client.getAppName();
        client.setAccessToken(accessToken.access_token_key, accessToken.access_token_secret);
        client.get('account/settings',  function(error, tweet, response) {
          if(error) {
            logTwitterError(error);
            throw error;
          }

          // write file in oauth_access_cache
          var fileToken = __dirname + '/oauth_access_cache/' + tweet.screen_name.toLowerCase() + '.tok';
          var accessTokenFileStats = null;
          var accessTokenJson = [];
          var found = false;

          try {
            accessTokenFileStats = fs.statSync(fileToken);
          } catch (e) {
            //
          }

          if(accessTokenFileStats !== null) {
            accessTokenFileJson = fs.readFileSync(fileToken, 'utf8');
            accessTokenJson = JSON.parse(accessTokenFileJson);
            for (var i = 0; i < accessTokenJson.length; i++) {
              if(accessTokenJson[i].app_name === accessToken.app_name) {
                found = true;
                log.info('RTwitterBot SaveOauth', 'Update access token for user %s for app %s', tweet.screen_name.toLowerCase(), accessToken.app_name);
                accessTokenJson[i] = accessToken;
                break;
              }
            }
          }

          if(accessTokenFileStats === null || !found) {
            log.info('RTwitterBot SaveOauth', 'Add access token user %s for app %s', tweet.screen_name.toLowerCase(), accessToken.app_name);
            accessTokenJson.push(accessToken);
          }

          fs.writeFileSync(fileToken, JSON.stringify(accessTokenJson));
        });

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Access Token saved");

        return;
      }
      else {
        log.error('RTwitterBot SaveOauth', 'Error in callback authenticate');

        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Error when callback authenticate");

        return;
      }
    });
  }
});

// now that server is running
server.listen(3000, '127.0.0.1', function(){
  log.info('RTwitterBot SaveOauth', 'Server listening');
});
