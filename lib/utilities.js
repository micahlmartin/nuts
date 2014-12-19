
module.exports = {
  safeStringify: function(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
  },
  uuid: function() {
    var uuid = require('node-uuid');
    return uuid.v1().replace(/-/gi, '');
  },
  keyMirror: function(obj) {
    var ret = {};
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      ret[key] = key;
    }
    return ret;
  }
}
