module.exports = {
  login: {
    handler: function(request, reply) {
      reply.view('partials/react.hbs', {
        contentComponent: 'account/login.jsx'
      });
    }
  },

  signup: {
    handler: function(request, reply) {
      reply.view('account/signup.hbs');
    }
  },
}
