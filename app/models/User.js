var Sequelize = require('sequelize');
var util      = require('util');

var User = Nuts.sequelize.define('User', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true}
},
{
  tableName: "users",
  instanceMethods : {
    fullName: function() { return util.format("%s %s", this.firstName, this.lastName); }
  }
})

module.exports = User;
