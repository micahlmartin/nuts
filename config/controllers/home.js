module.exports = {
  index: {
    handler: function(request, reply) {
      reply("Hello World!");
    }
  },
  secure: {
    auth: 'hmac',
    handler: function(request, reply) {
      reply("This is secure!");
    }
  }
}
