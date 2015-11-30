var client = getTwitterApp(undefined, ['trends/place']);
// Paris -> 615702
if(options.length === 0) {
  options.push(1);
}
var params = {id: options[0]};
client.get('trends/place', params, function(error, tweets, response){
  if (!error) {
    //console.log(util.inspect(tweets, { depth: null }));
    console.log('List Trends of ' + tweets[0].locations[0].name);
    for (var i = 0; i < tweets[0].trends.length; i++) {
      var promoted = '';
      if(tweets[0].trends[i].promoted_content !== null) {
        promoted = ' (promoted by: ' + tweets[0].trends[i].promoted_content + ')';
      }
      console.log(tweets[0].trends[i].name + promoted);
    }
  }
  else {
    logTwitterError(error);
    throw error;
  }
});
