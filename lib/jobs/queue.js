var kue                   = require('kue');

var _queue;

function _createQueue() {
 if(Nuts.settings.redis.env_key) {
    parsedUrl = require('parse-database-url')(process.env[Nuts.settings.redis.env_key]);
    return kue.createQueue({
      prefix: 'ht',
      redis: {
        port: parsedUrl.port,
        host: parsedUrl.host,
        auth: parsedUrl.password
      }
    });
  } else {
    return kue.createQueue();
  }
}

function _connect() {
  return _queue || (_queue = _createQueue());
}

module.exports = {
  connect: function() {
    return _connect();
  }
}
