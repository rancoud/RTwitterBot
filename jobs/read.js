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
      var t = new Tweet(tweets[i]);
      var _medias = t.getMedias();
      for (var j = 0; j < _medias.length; j++) {
        download(_medias[j].url, './medias/' + _medias[j].name);
      }
    }
  }
  else {
    logTwitterError(error);
    throw error;
  }
});
