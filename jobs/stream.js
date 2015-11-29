var client = getTwitterApp();
client.stream('statuses/filter', {track: options[0], reply: false}, function(stream) {
  stream.on('data', function(tweet) {
    if(tweet.retweeted_status === undefined) {
      console.log(tweet.text);
    }
  });

  stream.on('error', function(error) {
    logTwitterError(error);
  });
});
