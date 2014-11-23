module.exports = {
  login: {
    handler: function(request, reply) {
      reply.view("account/login.jsx", {path: request.path});
    }
  },

  signup: {
    handler: function(request, reply) {
      reply.view('account/signup.hbs');
    }
  },
}
