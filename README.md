# Nuts

This is boilerplate for a nodejs apps based on Hapi. I've borrowed some things from [hapi-ninja](https://github.com/poeticninja/hapi-ninja) and some conventions from Ruby on Rails.

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

# Conventions



# Stack

- [Hapi](http://hapijs.com/) - Web Server
- [Q](https://github.com/kriskowal/q) - Promise library
- [Http Signature](https://github.com/joyent/node-http-signature) - Server to Server authentication

