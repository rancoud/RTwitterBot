var client = getTwitterApp(undefined, ['trends/place']);
// Paris -> 615702
if(options.length === 0) {
  options.push(1);
}
var params = {id: options[0]};
client.get('trends/place', params, function(error, tweets, response){
  if (error) {
    logTwitterError(error);
    return;
  }

  tweets[0].trends.sort(function (a, b) {
    var va = (a.tweet_volume === null) ? 0 : a.tweet_volume,
        vb = (b.tweet_volume === null) ? 0 : b.tweet_volume;

    return va < vb ? 1 : ( va === vb ? 0 : -1 );
  });

  console.log('List Trends of ' + tweets[0].locations[0].name);
  for (var i = 0; i < tweets[0].trends.length; i++) {
    var promoted = volume = '';
    if(tweets[0].trends[i].promoted_content !== null) {
      promoted = ' (promoted by: ' + tweets[0].trends[i].promoted_content + ')';
    }
    if(tweets[0].trends[i].tweet_volume !== null) {
      volume = ' (volume: ' + tweets[0].trends[i].tweet_volume + ') ';
    }

    console.log(tweets[0].trends[i].name + volume + promoted);
  }

});
