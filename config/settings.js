var path = require('path');

// Defaults that you can access when you require this config.
module.exports = {
    app_name: "Nuts App",
    environment: process.env.NODE_ENV || 'development',
    rootPath: path.normalize(__dirname + '/../..'),
    port: parseInt(process.env.PORT, 10) || 3000,
    hapi: {}
}
