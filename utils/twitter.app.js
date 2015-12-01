global.getTwitterApp = function getTwitterApp(name, arrayEndpoints) {
  if(name !== undefined) {
    for (var i = 0; i < confTwitterApp.length; i++) {
      if(confTwitterApp[i].name === name) {
        log.info('RTBot', 'Use Twitter app %s', name);
        return client = new Twitter(confTwitterApp[i]);
      }
    }
    log.error('RTBot', 'Twitter app %s not found', name);
    throw "no app";
  }
  else {
    // no arguments? just give the first twitter app
    if(arrayEndpoints === undefined || !Array.isArray(arrayEndpoints) || arrayEndpoints.length < 1) {
      log.info('RTBot', 'Use Twitter app %s', confTwitterApp[0].name);
      return client = new Twitter(confTwitterApp[0]);
    }

    // for each twitter app we read rate limits using endpoints
    var matches = [];
    for (var i = 0; i < confTwitterApp.length; i++) {
      matches.push(0);
      var _rateLimit = getRateLimitByName(confTwitterApp[i].name, false);
      for (var j = 0; j < arrayEndpoints.length; j++) {
        var _parts = arrayEndpoints[j].split('/');
        var _endpoint = _rateLimit.resources[_parts[0]]['/'+arrayEndpoints[j]];
        if(_endpoint === undefined || _endpoint.remaining > 0) {
          matches[i]++;
        }
      }

      // if we have a full matches we can use this twitter app
      if(matches[i] === arrayEndpoints.length) {
        return client = new Twitter(confTwitterApp[i]);
      }
    }

    log.error('RTBot', 'No twitter app available');
    throw "no app";
  }
};
