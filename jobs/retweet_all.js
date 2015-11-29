var client = getTwitterApp();
var clientToPush = getTwitterApp();
client.stream('statuses/filter', {track: options[0]}, function(stream) {
  stream.on('data', function(tweet) {
    if(tweet.retweeted_status === undefined) {
      console.log(tweet.text);
      client.post('statuses/update', {status: tweet.text},  function(error, tweet, response) {
        if(error) {
          logTwitterError(error);
          throw error;
        }
        console.log(tweet);
      });
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
