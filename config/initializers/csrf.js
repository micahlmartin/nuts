Nuts.server.pack.register({
  plugin: require('crumb'),
  options: {
    key: "csrf",
    cookieOptions: {
      isSecure: !Nuts.isDevelopment
    }
  }
}, function (err) {
    if (err) throw err;
});
