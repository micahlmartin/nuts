var utilities = Nuts.require('lib/utilities');
var _         = require('lodash');


var roles = utilities.keyMirror({
  ADMIN: null
});

module.exports.obj  = roles;
module.exports.keys = _.keys(roles);

