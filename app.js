// require all files in utils folder
colors = require('colors');
util = require('util');
fs = require('fs');
fs.readdirSync(__dirname + '/utils/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    require('./utils/' + file);
  }
});

// init variables
job = '';
options = [];

// init logger
log = require('npmlog');
log.info('RTBot', 'Init');
process.on('exit', function() {
  log.info('RTBot', 'End');
});

// get job + options
process.argv.forEach(function (val, index, array) {
  if(index == 2) {
    job = val;
  }

  if(index > 2) {
    options.push(val);
  }

});

// if no job kill process
if(job.length < 1) {
  log.error('RTBot', 'No job found');
  process.exit(9);
}

// get twitter app configurations and Twitter module
confTwitterApp = require('./conf.twitter.app.js');
Twitter = require('twitter');

// check confTwitterApp > not empty AND no duplicate name
if(confTwitterApp.length === 0) {
  log.error('RTBot', 'File conf.twitter.app.js is empty');
  process.exit(1);
}
var _names = [];
var ready = confTwitterApp.length;
for (var i = 0; i < confTwitterApp.length; i++) {
  if(_names.indexOf(confTwitterApp[i].name) !== -1) {
    log.error('RTBot', 'Duplicate names in file conf.twitter.app.js');
    process.exit(1);
  }
  _names.push(confTwitterApp[i].name);

  // populate rate_limit_cache folder if empty
  var _json = getRateLimitByName(confTwitterApp[i].name);
  if(_json === null) {
    log.info('RTBot', 'Update rate_limit_cache json for %s', confTwitterApp[i].name);
    getClientRateLimit(new Twitter(confTwitterApp[i]), function(name) {
      return function(json) {
        saveRateLimitByName(name, JSON.stringify(json));

        ready--;
        if(ready === 0) {
          doJob();
        }
      };
    } (confTwitterApp[i].name));
  }
  else {
    ready--;
    if(ready === 0) {
      doJob();
    }
  }
}

function doJob() {
  log.info('RTBot', 'Search Job: %s', job);
  // search job in private folder jobs
  fs.readdir('./private_jobs', function(err, files) {
    var f, l = files.length, found = false;
    for (var i = 0; i < l; i++) {
      if (files[i] === job + '.js') {
        log.info('RTBot', 'Load job file: %s', files[i]);
        found = true;
        require('./private_jobs/' + files[i]);
        break;
      }
    }

    if(found === true) {
      return;
    }

    // search job in folder jobs
    fs.readdir('./jobs', function(err, files) {
      var f, l = files.length, found = false;
      for (var i = 0; i < l; i++) {
        if (files[i] === job + '.js') {
          log.info('RTBot', 'Load job file: %s', files[i]);
          found = true;
          require('./jobs/' + files[i]);
          break;
        }
      }

      if(found === false) {
        log.error('RTBot', 'Job %s not found', job);
      }
    });

  });
};
