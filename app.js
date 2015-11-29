// require all files in utils folder
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

// get twitter app
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

  var _json = getRateLimitByName(confTwitterApp[i].name);
  if(_json === null) {
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
  }
}

// check rate limit cache for each app
/*getClientRateLimit()


client = getTwitterApp(undefined, ["statuses/user_timeline"]);*/

/*
// init twitter app
client = new Twitter(confTwitterApp);
getClientRateLimit(client, function(rateLimitJson){
  console.log(rateLimitJson);
});return;
*/
function doJob() {
  log.info('RTBot', 'Search Job: %s', job);
  // search job in folder jobs
  fs.readdir('./jobs', function(err, files){
    var f, l = files.length;
    for (var i = 0; i < l; i++) {
      if (files[i] === job + '.js') {
        log.info('RTBot', 'Load job: %s', files[i]);
        require('./jobs/' + files[i]);
        break;
      }
    }
  });
};
