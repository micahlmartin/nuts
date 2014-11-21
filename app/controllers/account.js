module.exports = {
  login: {
    handler: function(request, reply) {
      reply.view("components/account/login.jsx");
    }
  },

  signup: {
    handler: function(request, reply) {
      reply.view('account/signup.hbs');
    }
  },
}
