var fs = require('fs');
job = '';
options = [];

process.argv.forEach(function (val, index, array) {
  if(index == 2) {
    job = val;
  }

  if(index > 2) {
    options.push(val);
  }

});
console.log(job);
console.log(options);


var confTwitterApp = require('./conf.twitter.app.js');
var Twitter = require('twitter');

client = new Twitter(confTwitterApp);


fs.readdir('./modules', function(err, files){
  var f, l = files.length;
  for (var i = 0; i < l; i++) {
    if (files[i] === job + '.js') {
      require('./modules/' + files[i]);
    }
  }
});
