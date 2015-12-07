var client = getTwitterApp();
client.stream('statuses/filter', {track: options[0]}, function(stream) {
  stream.on('data', function(tweet) {
    if(tweet.retweeted_status === undefined) {
      var user = new User(tweet.user);
      console.log(user.getName().green + ' : ' + tweet.text + '\n');
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
