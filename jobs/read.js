var client = getTwitterApp(undefined, ['statuses/user_timeline']);
var params = {screen_name: options[0]};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      /*
      var t = new Tweet(tweets[i]);
      console.log(t.getMedias());
      console.log(t.getHashtags());
      console.log(util.inspect(tweets[i], { depth: null }));
      */
      console.log(tweets[i].text + '\n');
    }
  }
  else {
    logTwitterError(error);
    throw error;
  }
});
