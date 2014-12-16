var options = {
  opsInterval: 1000,
  reporters: [{
    reporter: require('good-console'),
    args:[{ log: '*', request: '*', response: '*' }]
  }]
};

Nuts.server.register({
    register: require('good'),
    options: options
}, function (err) {
    if (err) {
        throw err;
    }
});
