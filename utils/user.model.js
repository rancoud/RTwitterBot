function User(user) {
  this.user = user;
}

User.prototype.getId = function () {
  return this.user.id_str;
};

User.prototype.getName = function () {
  return this.user.name;
};

User.prototype.getScreeName = function () {
  return this.user.screen_name;
};

User.prototype.getLocation = function () {
  return this.user.location;
};

User.prototype.getDescription = function () {
  return this.user.description;
};

User.prototype.getUrl = function () {
  var url = null;
  for (var i = 0; i < this.user.entities.url.urls.length; i++) {
    if(this.user.url === this.user.entities.url.urls[i].url) {
      url = this.user.entities.url.urls[i].expanded_url;
    }
  }

  if(url === null) {
    return {
      url: null,
      twitter_url: null
    };
  }

  return {
    url: url,
    twitter_url: this.user.url
  };
};

User.prototype.getUrls = function () {
  var urls = [];

  for (var i = 0; i < this.user.entities.url.urls.length; i++) {
    urls.push({
      url: this.user.entities.url.urls[i].expanded_url,
      twitter_url: this.user.entities.url.urls[i].url
    });
  }

  for (var i = 0; i < this.user.entities.description.urls.length; i++) {
    urls.push({
      url: this.user.entities.description.urls[i].expanded_url,
      twitter_url: this.user.entities.description.urls[i].url
    });
  }

  return urls;
};

User.prototype.isProtected = function () {
  return this.user.protected;
};

User.prototype.getFollowersCount = function () {
  return this.user.followers_count;
};

User.prototype.getFriendsCount = function () {
  return this.user.friends_count;
};

User.prototype.getListedCount = function () {
  return this.user.listed_count;
};

User.prototype.getCreatedAt = function () {
  return this.user.created_at;
};

User.prototype.getTimestamp = function () {
  return new Date(this.user.created_at.replace('+0000 ', '')).getTime();
};

User.prototype.getLocalTimestamp = function () {
  return new Date(this.user.created_at).getTime();
};

User.prototype.getFavoritesCount = function () {
  return this.user.favourites_count;
};

User.prototype.getUtcOffset = function () {
  return this.user.utc_offset;
};

User.prototype.getTimeZone = function () {
  return this.user.time_zone;
};

User.prototype.hasGeo = function () {
  return this.user.geo_enabled;
};

User.prototype.isVerified = function () {
  return this.user.verified;
};

User.prototype.getTweetCount = function () {
  return this.user.statuses_count;
};

User.prototype.getLang = function () {
  return this.user.lang;
};

User.prototype.isMyLang = function (lang) {
  return this.user.lang === lang;
};

User.prototype.hasContributors = function () {
  return this.user.contributors_enabled;
};

User.prototype.isTranslator = function () {
  return this.user.is_translator;
};

User.prototype.isTranslationEnabled = function () {
  return this.user.is_translation_enabled;
};

User.prototype.getProfileBackgroundColor = function () {
  return this.user.profile_background_color;
};

User.prototype.getProfileBackgroundImageUrl = function () {
  return this.user.profile_background_image_url;
};

User.prototype.getProfileBackgroundImageUrl = function () {
  return this.user.profile_background_image_url;
};

User.prototype.isProfileBackgroundTile = function () {
  return this.user.profile_background_tile;
};

User.prototype.getAvatar = function () {
  return this.user.profile_image_url;
};

User.prototype.getBanner = function () {
  return this.user.profile_banner_url;
};

User.prototype.getProfileLinkColor = function () {
  return this.user.profile_link_color;
};

User.prototype.getProfileSidebarBorderColor = function () {
  return this.user.profile_sidebar_border_color;
};

User.prototype.getProfileSidebarFillColor = function () {
  return this.user.profile_sidebar_fill_color;
};

User.prototype.getProfileTextColor = function () {
  return this.user.profile_text_color;
};

User.prototype.hasProfileBackgroundImage = function () {
  return this.user.profile_use_background_image;
};

User.prototype.hasExtendedProfile = function () {
  return this.user.has_extended_profile;
};

User.prototype.hasDefaultProfile = function () {
  return this.user.default_profile;
};

User.prototype.hasDefaultProfileImage = function () {
  return this.user.default_profile_image;
};

User.prototype.isFollowingMe = function () {
  return this.user.following;
};

User.prototype.sentFollowRequest = function () {
  return this.user.follow_request_sent;
};

global.User = User;
