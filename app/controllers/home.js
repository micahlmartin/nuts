module.exports = {
  index: {
    auth: 'session',
    handler: function(request, reply) {
      reply.view("home/index.jsx", {path: request.path});
    }
  },
  secure: {
    handler: function(request, reply) {
      reply("This is secure!");
    }
  }
}
