var client = getTwitterApp();
client.stream('statuses/filter', {track: options[0]}, function(stream) {
  stream.on('data', function(tweet) {
    if(tweet.retweeted_status === undefined) {
      var _user = new User(tweet);
      var _tweet = new Tweet(tweet);
      console.log(_user.getName().green + ' : ' + tweet.text + '\n');
      var _medias = _tweet.getMedias();
      for (var i = 0; i < _medias.length; i++) {
        download(_medias[i].url, './medias/' + _medias[i].name);
      }
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
