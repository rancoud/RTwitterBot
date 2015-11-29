global.getClientRateLimit = function getRateLimit(client, callback) {
  client.get('application/rate_limit_status', {}, function(error, rateLimitJson, response){
    if (!error) {
      callback(rateLimitJson);
    }
    else {
      logTwitterError(error);
      callback(null);
    }
  });
};

global.getRateLimitByName = function saveRateLimit(name) {
  // search in folder rate_limit_cache
  var rateLimitJson = null;
  var expirationFileTime = 20 * 60; // 20 minutes in seconds
  try {
    var rateLimitFileStats = fs.statSync('./rate_limit_cache/' + name + '.json');
    var _date = new Date();
    _date.setSeconds(_date.getSeconds() - expirationFileTime);
    // if file is still fresh, we can read and return it
    if(rateLimitFileStats.mtime.getTime() > _date.getTime()) {
      rateLimitJson = fs.readFileSync('./rate_limit_cache/' + name + '.json', 'utf8');
    }
  } catch (e) {
    if(e.errno !== -4058) {
      log.error('RTBot', 'getRateLimitByName: ' + e.toString());
      process.exit(1);
    }
  }

  return rateLimitJson;
};

global.saveRateLimitByName = function saveRateLimit(name, json) {
  fs.writeFileSync('./rate_limit_cache/' + name + '.json', json, 'utf8');
};
