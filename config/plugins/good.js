module.exports = {
  plugin: require('good'),
  options: {
    subscribers: {
        console: ['request', 'log', 'error']
    }
  }
}
