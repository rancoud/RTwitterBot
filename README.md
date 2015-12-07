# RTwitterBot
Bot for twitter

## Setup
1. Create Twitter application
2. Rename conf.twitter.app.sample.js to conf.twitter.app.js
3. Fill the file with **name** , **consumer_key** , **consumer_secret** , **access_token_key** , **access_token_secret**
4. Create your job in folder jobs

## Example
Once your twitter application created you can run the read job.
```
node job.js read "livecodingtv"
```

## How to write job
1. Create a file in jobs folder, the filename is the job name
2. In job get a Twitter app by using ```getTwitterApp(name, endpoints)```
  * if you provide no arguments the first Twitter app is returned
  * name (string or undefined - optionnal) : using a specific Twitter app
  * endpoints (array - optionnal) : return an available Twitter app which can use thoses endpoints (rate limit)
3. Documentation for the [Twitter Client used here](https://www.npmjs.com/package/twitter)

## PID watcher and killer
Jobs'list running (pid + job + options)
```
node pid.js
```
Kill a job
```
node pid.js kill {pidId}
```
Kill all jobs
```
node pid.js kill all
```

## JOBS
* hoover [word] -> use stream api to read tweets and download medias in medias folder
* live [word] -> use stream pi to read tweets
* onetweet [statuses_id] -> get one tweet with statuses id
* retweet_all [word] -> use stream api to retweet all on your account
* timeline [profile_name] -> read last tweet of someone
* trend [woeid] -> list trend (if no woeid take WorldWide trend)
* tweet [my tweet to tweet] -> push tweet

## Tweet Model
```
var _tweet = new Tweet(tweet);
```
- getCreatedAt()
- getTimestamp()
- getLocalTimestamp()
- getId()
- getText()
- getSource()
- isTruncated()
- isReply()
- getReplyToId()
- getReplyToUserId()
- getReplyToUserScreenName()
- getReplyToUser()
- getUser()
- getUserJson()
- getHashtags()
- getSymbols()
- getMentions()
- getMentionsId()
- getMentionsScreenName()
- getMentionsName()
- getUrls()
- getMedias()
- getCoordinates()
- getPlace()
- getPlaceName()
- getPlaceFullName()
- getCountry()
- getCountryCode()
- getContributors()
- isRetweet()
- getRetweet()
- getRetweetJson()
- getRetweetCount()
- getFavoriteCount()
- isFavoritedByMe()
- isRetweetedByMe()
- isSensitive()
- getLang()
- isMyLang()
- getTwitterUrl()

## User Model
```
var _user = new User(tweet.user);
```
- getId()
- getName()
- getScreeName()
- getLocation()
- getDescription()
- getUrl()
- getUrls()
- isProtected()
- getFollowersCount()
- getFriendsCount()
- getListedCount()
- getAvatar()
- getCreatedAt()
- getTimestamp()
- getLocalTimestamp()
- getFavoritesCount()
- getUtcOffset()
- getTimeZone()
- hasGeo()
- isVerified()
- getTweetCount()
- getLang()
- isMyLang()
- hasContributors()
- isTranslator()
- isTranslationEnabled()
- getProfileBackgroundColor()
- getProfileBackgroundImageUrl()
- isProfileBackgroundTile()
- getAvatar()
- getBanner()
- getProfileLinkColor()
- getProfileSidebarBorderColor()
- getProfileSidebarFillColor()
- getProfileTextColor()
- hasProfileBackgroundImage()
- hasExtendedProfile()
- hasDefaultProfile()
- hasDefaultProfileImage()
- isFollowingMe()
- sentFollowRequest()

## TODO
* add small job for each appel
* get or set output
* usable in command

## Nota Bene
JSON informations
* tweet geo is deprecated
* user notifications is deprecated
* possibly_sensitive_appealable is not used
* no endpoint for poll tweet
* if you want to tweet symbol, escape $ like this \$MYSYMBOL

## BUG
some medias is in 404 (too quick to donwload)
