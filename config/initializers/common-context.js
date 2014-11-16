var Hoek = require('hoek');

var defaultContext = {
  settings: Nuts.settings,
  navbarComponent: 'shared/navbar.jsx'
};

Nuts.server.ext('onPreResponse', function (request, reply) {
    if (request.response.variety === 'view') {
        request.response.source.context = Hoek.applyToDefaults(defaultContext, request.response.source.context);
    }

    reply();
});

