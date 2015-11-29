function User(tweet) {
  this.tweet = tweet;
}

User.prototype.getId = function () {
  return this.tweet.user.id_str;
};

User.prototype.getName = function () {
  return this.tweet.user.name;
};

User.prototype.getScreename = function () {
  return this.tweet.user.screename;
};

User.prototype.getAvatar = function () {
  return this.tweet.user.profile_image_url;
};

global.User = User;
