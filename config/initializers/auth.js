Nuts.server.pack.register(require('hapi-auth-cookie'), function(err) {
  if(err) throw err;

  Nuts.server.auth.strategy('session', 'cookie', {
    password: Nuts.settings.session_secret,
    redirectTo: '/login',
    isSecure: !Nuts.isDevelopment
  });

});

Nuts.server.pack.register(require('hapi-auth-signature'), function(err) {
  if(err) throw err;
})
