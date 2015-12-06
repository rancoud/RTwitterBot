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

## TODO
* test models -> add methods to completly use the json but in function way
* add small job for each appel
* get or set output
* usable in command
* download retry 3 times after 1 second after if not reachable

## Nota Bene
JSON informations
* tweet geo is deprecated
* user notifications is deprecated
* possibly_sensitive_appealable is not used
* no endpoint for poll tweet

## BUG
use $ in text cause bug -> have to escape it
