module.exports = {
  index: {
    handler: function(request, reply) {
      reply.view('main.hbs', {test: "yes"});
    }
  },
  secure: {
    auth: 'hmac',
    handler: function(request, reply) {
      reply("This is secure!");
    }
  }
}
