var options = {
  opsInterval: 1000,
  reporters: [{
    reporter: require('good-console'),
    args:[{ log: '*', request: '*' }]
  }]
};

Nuts.server.pack.register({
  plugin: require('good'),
  options: options
}, function(err) {
  if(err) throw err;
});
