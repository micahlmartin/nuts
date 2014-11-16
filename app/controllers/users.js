module.exports = {
  index: {
    auth: 'session',
    handler: function(request, reply) {
      Nuts.actions.LoadAllUsers.execute().then(function(users) {
        reply(users);
      })
    },
  },
  secure: {
    auth: 'hmac',
    handler: function(request, reply) {
      reply("This is secure!");
    }
  }
}
