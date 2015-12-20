require(__dirname + '/doc/api.js');

options = [];
// get options
process.argv.forEach(function (val, index, array) {
  if(index > 1) {
    options.push(val.toLowerCase());
  }
});

function displayEndpoint(endpoint) {
  console.log(endpoint.method.toUpperCase() + ' ' + endpoint.url + ' ' + endpoint.description);
}

function displayDetailsEndpoint(endpoint) {
  console.log(endpoint.method.toUpperCase() + ' ' + endpoint.url + "\n\nDescription:\n" + endpoint.description);

  displayParametersRequired(endpoint.parameters.required);
  displayParametersOptionnal(endpoint.parameters.optionnal);
}

function displayParametersRequired(parameters) {
  if(parameters.length === 0) {
    return;
  }

  console.log("\n"+'Parameters required:');
  for (var i = 0; i < parameters.length; i++) {
    if(typeof parameters[i] === 'string') {
      for (var j = 0; j < api.parameters.length; j++) {
        if(parameters[i] === api.parameters[j].name) {
          displayParameters(api.parameters[j]);
        }
      }
    }
    else {
      displayParameters(parameters[i]);
    }
  }
}

function displayParametersOptionnal(parameters) {
  if(parameters.length === 0) {
    return;
  }

  console.log("\n"+'Parameters optionnal:');
  for (var i = 0; i < parameters.length; i++) {
    if(typeof parameters[i] === 'string') {
      for (var j = 0; j < api.parameters.length; j++) {
        if(parameters[i] === api.parameters[j].name) {
          displayParameters(api.parameters[j]);
        }
      }
    }
    else {
      displayParameters(parameters[i]);
    }
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
  if(options.length < 2) {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'get') {
        displayEndpoint(api.endpoints[i]);
      }
    }
  }
  else {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].url === options[1]) {
        displayDetailsEndpoint(api.endpoints[i]);
        return;
      }
    }
  }
}
else if(options[0] === 'post') {
  if(options.length < 2) {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].method === 'post') {
        displayEndpoint(api.endpoints[i]);
      }
    }
  }
  else {
    for (var i = 0; i < api.endpoints.length; i++) {
      if(api.endpoints[i].url === options[1]) {
        displayDetailsEndpoint(api.endpoints[i]);
        return;
      }
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
