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

server.register({ register: require('yar'), options: yarOptions}, function(err) {
  if(err) throw err;
});

server.register(require('hapi-auth-cookie'), function(err) {
  if(err) throw err;
});

server.auth.strategy('session', 'cookie', 'try', {
  password: Nuts.settings.session.secret,
  isSecure: !Nuts.isDevelopment,
  clearInvalid: true,
  ttl: Nuts.settings.session.ttl_milliseconds,
  redirectTo: Nuts.settings.session.redirect_to,
  redirectOnTry: false,
  appendNext: true
});
