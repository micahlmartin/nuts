var Schema = require('jugglingdb').Schema
var util      = require('util');

var User = Nuts.schema.define('User', {
  firstName: String,
  lastName: String,
  bio: Schema.Text,
  email: { type: String, unique: true}
},
{
  table: "users"
})

User.prototype.fullName = function() {
  return util.format("%s %s", this.firstName, this.lastName);
}

module.exports = User;
