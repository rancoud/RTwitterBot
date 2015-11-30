global.download = function download(url, dest, callback) {
  log.info('RTBot', 'Download %s to %s', url, dest);
  var wrapper;
  if(url.substr(0,5) === "https") {
    wrapper = require('https');
  }
  else if(url.substr(0,4) === "http") {
    wrapper = require('http');
  }
  else {
    log.error('RTBot', 'Url not supported for donwload: %s', url);
    return;
  }
  var fs = require('fs');

  var file = fs.createWriteStream(dest);
  var request = wrapper.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(callback);
    });
  }).on('error', function(err) {
    fs.unlink(dest);
    if (callback) {
      callback(err.message);
    }
  });
};
