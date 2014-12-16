Nuts.server.register({
  register: require('crumb'),
  options: {
    key: "csrf",
    cookieOptions: {
      isSecure: !Nuts.isDevelopment
    }
  }
}, function (err) {
    if (err) throw err;
});
