var server = Nuts.server;

var yarOptions = {
  cache: {
    expiresIn: Nuts.settings.session.ttl_milliseconds,
  },
  cookieOptions: {
    password: Nuts.settings.session.secret,
    isSecure: !Nuts.isDevelopment
  }
};

server.pack.register({ plugin: require('yar'), options: yarOptions}, function(err) {
  if(err) throw err;
});

server.pack.register(require('../../lib/auth-cookie'), function(err) {
  if(err) throw err;
})

var cache = server.cache('sessions', {expiresIn: Nuts.settings.session.ttl_milliseconds });
server.app.cache = cache;

server.auth.strategy('session', 'cookie', {
  clearInvalid: true,
  redirectTo: Nuts.settings.session.redirect_to,
  appendNext: true
})
