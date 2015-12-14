require(__dirname + '/doc/api.js');

options = [];
// get options
process.argv.forEach(function (val, index, array) {
  if(index > 1) {
    options.push(val.toLowerCase());
  }
});

function displayEndpoint(endpoint) {
  console.log(endpoint.method.toUpperCase() + ' ' + endpoint.url + ' -> ' + endpoint.description);
}

function displayDetailsEndpoint(endpoint) {
  console.log(endpoint.method.toUpperCase() + ' ' + endpoint.url + ' -> ' + endpoint.description);
  for (var i = 0; i < endpoint.parameters.length; i++) {
    console.log(endpoint.parameters[i]);
  }
}

function displayParameters(params) {
  console.log(params.name + ' (' + params.type + ') -> ' + params.description);
}

if(options.length < 1) {
  for (var i = 0; i < api.endpoints.length; i++) {
    displayEndpoint(api.endpoints[i]);
  }
  return;
}

if(options[0] === 'get') {
  for (var i = 0; i < api.endpoints.length; i++) {
    if(api.endpoints[i].method === 'get') {
      displayEndpoint(api.endpoints[i]);
    }
  }
}
else if(options[0] === 'post') {
  for (var i = 0; i < api.endpoints.length; i++) {
    if(api.endpoints[i].method === 'post') {
      displayEndpoint(api.endpoints[i]);
    }
  }
}
else if(options[0] === 'parameters') {
  for (var i = 0; i < api.parameters.length; i++) {
    displayParameters(api.parameters[i]);
  }
}
else if(options[0] === 'test') {
  //launch a test for api
  globalApp = globalUser = null;
  log = require('npmlog');
  confTwitterApp = require(__dirname + '/conf.twitter.app.js');
  require(__dirname + '/utils/rtwitter.js');
  require(__dirname + '/utils/twitter.app.js');
  var client = getTwitterApp();
  client.get(options[1], {},  function(error, tweet, response) {
    if(error) {
      console.log(require('util').inspect(error, { depth: null }));
      return;
    }

    console.log(require('util').inspect(tweet, { depth: null }));
  });
}
else {
  for (var i = 0; i < api.endpoints.length; i++) {
    if(api.endpoints[i].url === options[0]) {
      displayDetailsEndpoint(api.endpoints[i]);
      return;
    }
  }

  console.log('endpoint not found');
}
