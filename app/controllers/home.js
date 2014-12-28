module.exports = {
  index: {
    handler: function(request, reply) {
      reply.view("home/index.jsx", {path: request.path});
    }
  },
  secure: {
    auth: 'session',
    plugins: {
      hapiAuthorization: {
        role: Nuts.models.Roles.ADMIN
      }
    },
    handler: function(request, reply) {
      reply("This is secure!");
    }
  }
}
