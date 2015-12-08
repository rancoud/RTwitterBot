var client = getTwitterApp(undefined, ['statuses/update']);
if(globalFile === null) {
  // no media to post -> classic tweet
  client.post('statuses/update', {status: options[0]},  function(error, tweet, response) {
    if(error) {
      logTwitterError(error);
    }
    console.log(tweet);
  });
}
else {
  // in 2 times: post media and after post tweet
  var data = fs.readFileSync(globalFile);
  client.post('media/upload', {media: data}, function(error, media, response) {
    if(response.statusCode === 400) {
      // chunked mode
      if(globalFile.indexOf('.mp4') !== -1) {
        client.sendChunkedVideo(globalFile, function(mediaId) {
          client.post('statuses/update', {status: options[0], media_ids: mediaId},  function(error, tweet, response) {
            if(error) {
              logTwitterError(error);
              return;
            }
            console.log(tweet);
          });
        });
      }
      else {
        log.error('RTwitterBot', 'Upload failed!');
      }
    }
    else {
      // maybe really have error
      if(error) {
        logTwitterError(error);
        return;
      }

      client.post('statuses/update', {status: options[0], media_ids: media.media_id_string},  function(error, tweet, response) {
        if(error) {
          logTwitterError(error);
          return;
        }
        console.log(tweet);
      });
    }
  });
}
