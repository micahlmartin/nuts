# Nuts

This is an opiniated template for nodejs apps based on Hapi. I've borrowed some things from [hapi-ninja](https://github.com/poeticninja/hapi-ninja) and some conventions from Ruby on Rails.

# Running

To spin up the server just run `./nuts server`. It will default to port `3000`. You can change this by either setting an environment variable `PORT=3000` or by changing the default settings in `config/settings.js`.

#### Nodemon
If you have `nodemon` installed you can open up the `nuts` file in the root of the project and change the first line to `#!/usr/bin/env nodemon` to automatically have the server restart when changes are made. 

Alternatively you can create your own script file and bootstrap the Nuts environment.

```javascript
// server.js
require('config/nuts').deez();
```

Then you can run it with `nodemon server.js`.

#### REPL

To open up a REPL with a fully loaded environment you can run `./nuts console`. This makes it easy to execute commands in your environment and should be very familiar to those coming from Rails.

# Settings

You can configure your environment settings in `settings.yml`. The file is precompiled using the [Lodash template](https://lodash.com/docs#template) syntax similar to ERB.

# Conventions

## Routes

## Controllers

## Models

## Migrations

To manage migrations you will need to install the sequelize command line tool.

```
npm install -g sequelize-cli
```

Refer to the [documentation](http://sequelizejs.com/docs/latest/migrations) for more details.

## Actions

Actions are simple single purpose objects that act in some way on one or more models. They are used to encapsulate business logic. The convention is to keep the file names camelcased. This makes it easy to access them in a consistent way like `Nuts.actions.MyAction`;

They take the following format:

```javascript
// app/actions/MyAction.js

module.exports = {
  execute: function(params /* option */) {
    var deferred = Nuts.defer();

    // Simulate some async procss
    process.nextTick(function() {
      // If process was successful then resolve the promise
      deferred.resolve(/* optional data */);

      // If there was an error then return it
      deferred.reject(/*some err*/)
    })

    return deferred.promise;
  }
}
```

## Environment

The default environment is `development`. It can be overriden with an environment variable `NODE_ENV=production`. There should be a corresponding file in `app/config/environments` for each environment.

## Initializers

These are configurations that are loaded in every environment. They are not loaded in a specific order. They're useful for configuring various libraries.

## Plugins

Hapi plugins are configured from the `config/plugins` directory. They should export an object in the following format:

```javascript
// config/plugins/good.js
module.exports = {
  plugin: require('good'),
  options: {
    subscribers: {
        console: ['request', 'log', 'error']
    }
  }
}
```

You can read more about Hapi plugins [here](http://hapijs.com/tutorials/plugins).

# Stack

- [Hapi](http://hapijs.com/) - Web Server
- [Q](https://github.com/kriskowal/q) - Promise library
- [Http Signature](https://github.com/joyent/node-http-signature) - Server to Server authentication
- [Sequelize](http://sequelizejs.com/)


