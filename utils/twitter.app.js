global.getTwitterApp = function getTwitterApp(name, arrayEndpoints) {
  if(globalApp !== null) {
    name = globalApp;
  }

  if(name !== undefined) {
    for (var i = 0; i < confTwitterApp.length; i++) {
      if(confTwitterApp[i].name === name) {
        log.info('RTwitterBot', 'Use Twitter app %s', name);
        client = new RTwitter(confTwitterApp[i]);
        if(globalUser !== null) {
          client.setAccessTokenByUser(globalUser);
        }
        return client;
      }
    }
    log.error('RTwitterBot', 'Twitter app %s not found', name);
    process.exit(1);
  }
  else {
    // no arguments? just give the first twitter app
    if(arrayEndpoints === undefined || !Array.isArray(arrayEndpoints) || arrayEndpoints.length < 1) {
      log.info('RTwitterBot', 'Use Twitter app %s', confTwitterApp[0].name);
      client = new RTwitter(confTwitterApp[0]);
      if(globalUser !== null) {
        client.setAccessTokenByUser(globalUser);
      }
      return client;
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
        client = new RTwitter(confTwitterApp[i]);
        if(globalUser !== null) {
          client.setAccessTokenByUser(globalUser);
        }
        return client;
      }
    }

    log.error('RTwitterBot', 'No twitter app available');
    process.exit(1);
  }
};
