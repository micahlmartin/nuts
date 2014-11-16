
module.exports = {
  safeStringify: function(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
  },
  uuid: function() {
    var uuid = require('node-uuid');
    return uuid.v1().replace(/-/gi, '');
  }
}
