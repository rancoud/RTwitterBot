var client = getTwitterApp(undefined, ['statuses/user_timeline']);
var params = {screen_name: options[0]};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    }
  }
  else {
    logTwitterError(error);
    throw error;
  }
});
