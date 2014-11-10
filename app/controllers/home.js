module.exports = {
  index: {
    handler: function(request, reply) {
      reply.view('home/index.hbs', {test: "yes"});
    }
  },
  secure: {
    auth: 'hmac',
    handler: function(request, reply) {
      reply("This is secure!");
    }
  }
}
