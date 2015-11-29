var client = getTwitterApp(undefined, ['statuses/user_timeline']);
console.log(client);
return;
var params = {screen_name: options[0]};
client.get('statuses/user_timelineaa', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
  else {
    logTwitterError(error);
  }
});
