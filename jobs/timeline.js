var client = getTwitterApp(undefined, ['statuses/user_timeline']);
var params = {screen_name: options[0]};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text + '\n');
      var t = new Tweet(tweets[i]);
      var _medias = t.getMedias();
      for (var j = 0; j < _medias.length; j++) {
        download(_medias[j].url, __dirname + '/../medias/' + _medias[j].name);
      }
    }
  }
  else {
    logTwitterError(error);
    throw error;
  }
});
