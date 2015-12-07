var client = getTwitterApp(undefined, ['statuses/show/:id']);
client.get('statuses/show/' + options[0], {},  function(error, tweet, response) {
  if(error) {
    logTwitterError(error);
    throw error;
  }

  console.log(util.inspect(tweet,{depth:null}));

  var t = new Tweet(tweet);

  /*console.log("getCreatedAt: " + t.getCreatedAt());
  console.log("getTimestamp: " + t.getTimestamp());
  console.log("getLocalTimestamp: " + t.getLocalTimestamp());
  console.log("getId: " + t.getId());
  console.log("getText: " + t.getText());
  console.log("getSource: " + t.getSource());
  console.log("isTruncated: " + t.isTruncated());

  console.log("isReply: " + t.isReply());
  console.log("getReplyToId: " + t.getReplyToId());
  console.log("getReplyToUserId: " + t.getReplyToUserId());
  console.log("getReplyToUserScreenName: " + t.getReplyToUserScreenName());
  console.log("getReplyToUser: " + util.inspect(t.getReplyToUser(),{depth:null}));

  console.log("getUser: " + util.inspect(t.getUser(), {depth:null}));
  console.log("getUserJson: " + util.inspect(t.getUserJson(), {depth:null}));

  console.log("getHashtags: " + util.inspect(t.getHashtags(), {depth:null}));
  console.log("getSymbols: " + util.inspect(t.getSymbols(), {depth:null}));
  console.log("getMentions: " + util.inspect(t.getMentions(), {depth:null}));
  console.log("getMentionsId: " + util.inspect(t.getMentionsId(), {depth:null}));
  console.log("getMentionsScreenName: " + util.inspect(t.getMentionsScreenName(), {depth:null}));
  console.log("getMentionsName: " + util.inspect(t.getMentionsName(), {depth:null}));
  console.log("getUrls: " + util.inspect(t.getUrls(), {depth:null}));
  console.log("getMedias: " + util.inspect(t.getMedias(), {depth:null}));

  console.log("getCoordinates: " + t.getCoordinates());

  console.log("getPlace: " + t.getPlace());
  console.log("getPlaceName: " + t.getPlaceName());
  console.log("getPlaceFullName: " + t.getPlaceFullName());
  console.log("getCountry: " + t.getCountry());
  console.log("getCountryCode: " + t.getCountryCode());

  console.log("getContributors: " + t.getContributors());

  console.log("isRetweet: " + t.isRetweet());
  console.log("getRetweet: " + util.inspect(t.getRetweet(), {depth:null}));
  console.log("getRetweetJson: " + util.inspect(t.getRetweetJson(), {depth:null}));

  console.log("getRetweetCount: " + t.getRetweetCount());
  console.log("getFavoriteCount: " + t.getFavoriteCount());

  console.log("isFavoritedByMe: " + t.isFavoritedByMe());
  console.log("isRetweetedByMe: " + t.isRetweetedByMe());

  console.log("isSensitive: " + t.isSensitive());

  console.log("getLang: " + t.getLang());
  console.log("isMyLang: " + t.isMyLang('fr'));

  console.log("getTwitterUrl: " + t.getTwitterUrl());*/

  var u = new User(tweet.user);
  /*console.log("getId: " + u.getId());
  console.log("getName: " + u.getName());
  console.log("getScreeName: " + u.getScreeName());
  console.log("getLocation: " + u.getLocation());
  console.log("getDescription: " + u.getDescription());
  console.log("getUrl: " + util.inspect(u.getUrl(), {depth:null}));
  console.log("getUrls: " + util.inspect(u.getUrls(), {depth:null}));
  console.log("isProtected: " + u.isProtected());

  console.log("getFollowersCount: " + u.getFollowersCount());
  console.log("getFriendsCount: " + u.getFriendsCount());
  console.log("getListedCount: " + u.getListedCount());

  console.log("getAvatar: " + u.getAvatar());

  console.log("getCreatedAt: " + u.getCreatedAt());
  console.log("getTimestamp: " + u.getTimestamp());
  console.log("getLocalTimestamp: " + u.getLocalTimestamp());

  console.log("getFavoritesCount: " + u.getFavoritesCount());

  console.log("getUtcOffset: " + u.getUtcOffset());
  console.log("getTimeZone: " + u.getTimeZone());
  console.log("hasGeo: " + u.hasGeo());

  console.log("isVerified: " + u.isVerified());

  console.log("getTweetCount: " + u.getTweetCount());

  console.log("getLang: " + u.getLang());
  console.log("isMyLang: " + u.isMyLang('fr'));

  console.log("hasContributors: " + u.hasContributors());
  console.log("isTranslator: " + u.isTranslator());
  console.log("isTranslationEnabled: " + u.isTranslationEnabled());

  console.log("getProfileBackgroundColor: " + u.getProfileBackgroundColor());
  console.log("getProfileBackgroundImageUrl: " + u.getProfileBackgroundImageUrl());
  console.log("isProfileBackgroundTile: " + u.isProfileBackgroundTile());
  console.log("getAvatar: " + u.getAvatar());
  console.log("getBanner: " + u.getBanner());
  console.log("getProfileLinkColor: " + u.getProfileLinkColor());
  console.log("getProfileSidebarBorderColor: " + u.getProfileSidebarBorderColor());
  console.log("getProfileSidebarFillColor: " + u.getProfileSidebarFillColor());
  console.log("getProfileTextColor: " + u.getProfileTextColor());
  console.log("hasProfileBackgroundImage: " + u.hasProfileBackgroundImage());

  console.log("hasExtendedProfile: " + u.hasExtendedProfile());
  console.log("hasDefaultProfile: " + u.hasDefaultProfile());
  console.log("hasDefaultProfileImage: " + u.hasDefaultProfileImage());

  console.log("isFollowingMe: " + u.isFollowingMe());
  console.log("sentFollowRequest: " + u.sentFollowRequest());*/
});
