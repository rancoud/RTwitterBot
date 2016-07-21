var client = getTwitterApp();
client.stream('statuses/filter', {track: options[0]}, function(stream) {

  var words = {};

  stream.on('data', function(tweet) {
    if(tweet.retweeted_status === undefined) {
      // clear terminal
      process.stdout.write('\033c');
      // exploded tweet
      var _words = tweet.text.toLowerCase().split(' ');
      // count words
      for(var i = 0; i < _words.length; i++) {
        if(words[_words[i]] === undefined) {
          words[_words[i]] = 0;
        }
        words[_words[i]] = words[_words[i]] + 1;
      }
      // show words
      console.log(words);
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});