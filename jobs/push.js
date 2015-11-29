var client = getTwitterApp(undefined, ['statuses/update']);
client.post('statuses/update', {status: options[0]},  function(error, tweet, response) {
  if(error) {
    logTwitterError(error);
    throw error;
  }
  console.log(tweet);
});
