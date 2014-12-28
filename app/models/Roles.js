var utilities = Nuts.require('lib/utilities');
var _         = require('lodash');


var roles = utilities.keyMirror({
  ADMIN: null
});

module.exports  = roles;
module.exports._keys = _.keys(roles);

