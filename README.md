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
Hapi plugins are configured just like other initializers.

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


# Deployment

This kit is designed to make it easy to deploy to heroku. Here is what you need to setup a new app on Heroku:

```
heroku apps:create <app_name>
heroku addons:add mongohq:sandbox
heroku config:set NODE_ENV=production

git push heroku master
```

During deployment, Heroku uses the `npm postinstall` hook to automatically compile and minfy all of the assets. You can read more about it [here](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process).


# Stack

- [Hapi](http://hapijs.com/) - Web Server
- [Webpack](http://webpack.github.io/) - Asset management
- [React](http://facebook.github.io/react/)
- [Mongoose](http://mongoosejs.com/)


# Thanks

- [hapi-ninja](https://github.com/poeticninja/hapi-ninja)
- [hackathon-starter](https://github.com/sahat/hackathon-starter)

...and the maintainers of all the other libraries.
