# RTBot
Bot for twitter

## Setup
1. Create Twitter application
2. Rename conf.twitter.app.sample.js to conf.twitter.app.js
3. Create your job in folder jobs

## Example
Once your twitter application created you can run the read job.
```
node app.js read "livecodingtv"
```

## How to write job
1. Create a file in jobs folder, the filename is the job name
2. In job get a Twitter app by using ```getTwitterApp(name, endpoints)```
  * if you provide no arguments the first Twitter app is returned
  * name (string or undefined - optionnal) : using a specific Twitter app
  * endpoints (array - optionnal) : return an available Twitter app which can use thoses endpoints (rate limit)
3. Documentation for the [Twitter Client used here](https://www.npmjs.com/package/twitter)

## TODO
* connexion
* have some utils
  * function hasLink
  * function hasMedia
  * get user
  * get last 10 tweets
  * get avatar
* modules
  * get last tweet
  * push a tweet on profile
  * stream
