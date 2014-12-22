# Nuts

This is an opinionated template for nodejs apps.

# Running

To spin up the server just run `npm start`. This will compile all of the assets and start the server on port `3000`. You can change this by either setting an environment variable `PORT=3000` or by changing the default settings in `config/settings.js`.

[Foreman](https://github.com/strongloop/node-foreman) is used for managing the processes so if you want to change what gets run during development you can update the `Procfile.dev` file.

### REPL

To open up a REPL with a fully loaded environment you can run `npm run console`. This makes it easy to execute commands in your environment and should be very familiar to those coming from Rails.

# Settings

You can configure your environment settings in `settings.yml`. The file is precompiled using the [Lodash template](https://lodash.com/docs#template) syntax similar to ERB.

# Conventions

## Routes

## Controllers

## Models

## Actions

Actions are simple single purpose functions that act in some way on one or more models. They are used to encapsulate business logic. They can either be `require`d directly or accessed via `Nuts.actions.myAction`;

They take the following format:

```javascript
// app/actions/MyAction.js

module.exports = function(/* optional params */) {
    var deferred = Nuts.defer();

    process.nextTick(function() {
      // If process was successful then resolve the promise
      deferred.resolve(/* optional data */);

      // If there was an error then return it
      deferred.reject(/*some err*/)
    })

    return deferred.promise;
}
```

They can then be invoked like this:

```javascript
Nuts.actions.MyAction().then(function() {
  // Completed successfully
}).fail(function(err) {
  // Action failed
}).done();
```

The `Nuts.defer()` is just a wrapper for the `Q` promise library. You can find out more about it [here](https://github.com/kriskowal/q);

## Environment

The default environment is `development`. It can be overriden with an environment variable `NODE_ENV=production`. There should be a corresponding file in `app/config/environments` for each environment. These can be used if you need to load specific settings or configurations for each environment.

## Initializers

These are configurations that are loaded in every environment. They are not loaded in a specific order. They're useful for configuring various libraries and plugins

## Hapi Plugins
Hapi plugins are configured just like other initializers. You can access the Hapi server via `Nuts.server`.

```javascript
// config/initializers/good.js
Nuts.server.pack.register({
  plugin: require('good'),
  options: {
    subscribers: {
      console: ['request', 'log', 'error']
    }
  }
}, function(err) {
  if(err) throw err;
});

```

You can read more about Hapi plugins [here](http://hapijs.com/tutorials/plugins).

# Assets

Assets are built using [webpack](http://webpack.github.io/). If you want to build and watch the assets for changes you can run `npm run assets`. This process will happen automtically for you in development when you run `npm start`.

# Delayed Jobs

Background jobs are processed using a redis job queue called [Kue](https://github.com/learnboost/kue).

## Configuring Redis

As long as Redis is running locally on a default port and IP it will work out of the box when running in development. 

If you want to run it on Heroku using a Redis plugin you can just specify which environment variable contains the proper connection string you want to use. Check your settings to figure out which connectionstring your Redis plugin uses and then specify it in the `REDIS_ENV_KEY` env var. 

For instance, if you have the Redis To Go plugin installed you can tell Kue to use that connectionstring by setting it like this:

`heroku config:set REDIS_ENV_KEY=REDISTOGO_URL`

## Sending a job to the queue

First you need to get access the kue jobs object

```javascript
var jobs = Nuts.require('lib/jobs/queue').connect();
```

Calling `connect` returns a singleton that can be used to create the jobs. Here is an example that sends an email confirmation when a user registers:

```javascript
// app/actions/registerUser.js

module.exports = function(params) {
  var deferred = Nuts.defer();

  new Nuts.models.User(params).save(function(err, savedUser) {
    if(err) return deferred.reject(err);

    var jobs = Nuts.require('lib/jobs/queue').connect();
    jobs
      .create('send_email_confirmation', {
        email: savedUser.email,
        title: savedUser.email
      })
      .priority('high')
      .attempts(5)
      .save(function(err) {
        if(err) Nuts.reportError(err);

        deferred.resolve(savedUser);
      });
  });

  return deferred.promise;
};
```

Consult the [Kue documentation](https://github.com/learnboost/kue) for more information on various options you can use when creating jobs.

## Processing jobs

Job processors are grouped by type. This allows different workers to be setup to process different kinds of jobs. Processors must be located in the `lib/jobs` folder and should have the following format:

```javascript
module.exports = {
  process: function(concurrency) { /** process Job **/ }
}
```

Here is a working example that process email confirmation jobs:

```javascript
//lib/jobs/email.js

var DEFAULT_CONCURRENCY   = 5;
var jobs                  = require('./queue').connect();

module.exports = {
  process: function(concurrency) {
    jobs.process('send_email_confirmation', (concurrency || DEFAULT_CONCURRENCY), function(job, done) {

      Nuts.actions.sendEmailConfirmation(job.data.email).then(function(result) {
        done();
      }).fail(function(err) {
        Nuts.reportError(err);
        done(err);
      });

    });
  }
}
```

Consult the [Kue documentation](https://github.com/learnboost/kue) for more information about processing jobs.

## Workers

Workers are segmented by the different types of processors located in `lib/jobs`. You can start a worker on a specific process like this:

```bash
KUE_NAME=email KUE_CONCURRENCY=10 ./bin/kue-worker
```

This will run the `lib/jobs/email` processor with a default concurrency of `10`.

Be sure to add this to your `Procfile` to run it in production or your `Procfile.dev` to run it locally.

```bash
email_worker: KUE_NAME=email KUE_CONCURRENCY=10 ./bin/kue-worker
```

## Web Interface

There is a web interface you can access that will allow you to view all of the jobs and their progress. The ports is specified in `Nuts.settings.kue.port`. By default you can access it locally at [http://localhost:3800](http://localhost:3800).


# Deployment

This kit is designed to make it easy to deploy to heroku. Here is what you need to setup a new app on Heroku:

```
heroku apps:create <app_name>
heroku addons:add mongohq:sandbox
heroku config:set NODE_ENV=production
heroku config:set DOMAIN=<app_name>.herokuapp.com

git push heroku master
```

During deployment, Heroku uses the `npm postinstall` hook to automatically compile and minfy all of the assets. You can read more about it [here](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process).


# Stack

- [Hapi](http://hapijs.com/) - Web Server
- [Webpack](http://webpack.github.io/) - Asset management
- [React](http://facebook.github.io/react/) - Javscript UI framework
- [Mongoose](http://mongoosejs.com/) - Mongo ORM
- [Kue](https://github.com/learnboost/kue) - Job queue


# Thanks

- [hapi-ninja](https://github.com/poeticninja/hapi-ninja)
- [hackathon-starter](https://github.com/sahat/hackathon-starter)

...and the maintainers of all the other libraries.
