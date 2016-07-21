var client = getTwitterApp();
client.stream('statuses/filter', {track: options[0]}, function(stream) {

  var words = {};

  stream.on('data', function(tweet) {
    if(tweet.retweeted_status === undefined) {
      // clear terminal
      if(options.length < 2) {
        process.stdout.write('\033c');
      }

      // exploded tweet
      var _words = tweet.text.toLowerCase().split(' ');

      // count words
      for(var i = 0; i < _words.length; i++) {
        if(words[_words[i]] === undefined) {
          words[_words[i]] = 0;
        }
        words[_words[i]] = words[_words[i]] + 1;
      }

      // show words or write in a file
      if(options.length < 2) {
        console.log(words);
      }
      else {
        fs.writeFileSync(options[1], JSON.stringify(words));
      }
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});