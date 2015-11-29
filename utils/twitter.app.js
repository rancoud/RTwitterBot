global.getTwitterApp = function getTwitterApp(name, arrayEndpoints) {
  if(name !== undefined) {
    for (var i = 0; i < confTwitterApp.length; i++) {
      if(confTwitterApp[i].name === name) {
        return client = new Twitter(confTwitterApp[i]);
      }
    }
  }
  else {
    //pour chaque app on reagrde les rate limits et les endpoints
    for (var i = 0; i < confTwitterApp.length; i++) {
      var _rateLimit = getRateLimitByName(confTwitterApp[i].name);
      if(_rateLimit === null) {
        var _rateLimitJson = getRateLimitByName(name);
        if(_rateLimitJson === null) {
          getClientRateLimit(new Twitter(confTwitterApp[i]));
        }
      }
      /*if(getRateLimitconfTwitterApp[i].name) {
        return client = new Twitter(confTwitterApp[i]);
      }*/
    }
  }
};
