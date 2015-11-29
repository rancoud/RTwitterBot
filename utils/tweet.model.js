function Tweet(tweet) {
  this.tweet = tweet;
}

Tweet.prototype.getId = function () {
  return this.tweet.id_str;
};

Tweet.prototype.getText = function () {
  return this.tweet.text;
};

Tweet.prototype.getMedias = function (videoFormat) {
  var videoFormat = videoFormat || 'mp4';
  var medias = [];

  if(this.tweet.entities['media'] === undefined) {
    return medias;
  }

  for (var i = 0; i < this.tweet.entities.media.length; i++) {
    if(this.tweet.entities.media[i].type === 'photo') {
      medias.push({
        url: this.tweet.entities.media[i].url,
        poster: this.tweet.entities.media[i].url,
        type: this.tweet.entities.media[i].type
      });
    }
    else if(this.tweet.entities.media[i].type === 'video' || this.tweet.entities.media[i].type === 'animated_gif') {
      var url;

      if(videoFormat === 'all') {
        url = this.tweet.extended_entities.media[i].video_info.variants;
      }
      else if(videoFormat === 'mp4') {
        for (var j = 0; j < this.tweet.extended_entities.media[i].video_info.variants.length; j++) {
          if(this.tweet.extended_entities.media[i].video_info.variants[j].content_type === 'video/mp4') {
            url = this.tweet.extended_entities.media[i].video_info.variants[j].url;
            break;
          }
        }
      }
      else if(videoFormat === 'webm') {
        for (var j = 0; j < this.tweet.extended_entities.media[i].video_info.variants.length; j++) {
          if(this.tweet.extended_entities.media[i].video_info.variants[j].content_type === 'video/webm') {
            url = this.tweet.extended_entities.media[i].video_info.variants[j].url;
            break;
          }
        }
      }

      medias.push({
        url: url,
        poster: this.tweet.entities.media[i].url,
        type: this.tweet.entities.media[i].type
      });
    }
    else {
      medias.push({
        url: this.tweet.entities.media[i].url,
        poster: '',
        type: this.tweet.entities.media[i].type
      });
    }
  }

  return medias;
};

Tweet.prototype.getHashtags = function () {
  var hashtags = [];

  for (var i = 0; i < this.tweet.entities.hashtags.length; i++) {
    hashtags.push(this.tweet.entities.hashtags[i].text);
  }

  return hashtags;
};

Tweet.prototype.getMentions = function () {
  var mentions = [];

  for (var i = 0; i < this.tweet.entities.user_mentions.length; i++) {
    mentions.push(this.tweet.entities.user_mentions[i]);
  }

  return mentions;
};

global.Tweet = Tweet;
