module.exports = {
  index: {
    handler: function(request, reply) {
      reply.view("application.jsx");
    }
  },
  secure: {
    auth: 'hmac',
    handler: function(request, reply) {
      reply("This is secure!");
    }
  }
}
