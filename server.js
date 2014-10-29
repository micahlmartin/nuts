var Hapi = require('hapi');
// var Good = require('good');

var server = new Hapi.Server('localhost', 4900);

module.exports = server;

require('./config/nuts').deez();

server.start(function () { });
