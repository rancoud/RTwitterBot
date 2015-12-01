# RTBot
Bot for twitter

## Setup
1. Create Twitter application
2. Rename conf.twitter.app.sample.js to conf.twitter.app.js
3. Fill the file with a name and consumer_key consumer_secret access_token_key access_token_secret
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

## TODO
* test models
