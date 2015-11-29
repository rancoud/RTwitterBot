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
  // cherche dans le dossier rate_limit_cache
  var rateLimitJson = null;
  try {
    var rateLimitJson = fs.statSync('./rate_limit_cache/' + name + '.jslon');
    rateLimitJson = JSON.parse(rateLimitJson);
  } catch (e) {
    if(e.errno !== -4058) {
      log.error('RTBot', 'getRateLimitByName: ' + e.toString());
      process.exit(1);
    }
  }

  return rateLimitJson;
};

global.saveRateLimitByName = function saveRateLimit(name, json) {
  fs.appendFileSync('./rate_limit_cache/' + name + '.json', json, 'utf8');
};
