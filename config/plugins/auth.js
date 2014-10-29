module.exports = {
  plugin: require('hapi-auth-signature'),
  options: {
    subscribers: {
        console: ['request', 'log', 'error']
    }
  }
}
