Nuts.server.ext('onPreResponse', function(request, reply) {

  var response = request.response;

  var acceptsJSON = (request.headers.accept.split(',').indexOf('application/json') > -1);

  if (!response.isBoom || acceptsJSON) {
    return reply.continue();
  }

  // Replace error with friendly HTML
  var statusCode = request.response.output.statusCode;
  return reply.view(statusCode + '.html');
});
