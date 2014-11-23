module.exports = {
  index: {
    handler: function(request, reply) {
      reply.view("home/index.jsx", {path: request.path});
    }
  },
  secure: {
    auth: 'hmac',
    handler: function(request, reply) {
      reply("This is secure!");
    }
  }
}
