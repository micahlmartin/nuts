Nuts.server.register({
  register: require('crumb'),
  options: {
    key: "csrf",
    restful: true,
    cookieOptions: {
      isSecure: !Nuts.isDevelopment
    }
  }
}, function (err) {
    if (err) throw err;
});
