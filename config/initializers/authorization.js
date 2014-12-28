Nuts.server.register({
  register: require('hapi-authorization'),
  options: {
    roles: false
  }
}, function(err) {
  if(err) Nuts.reportError(err, true);
});
