"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true }
    }).success(function() {
      done();
    });
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('users').success(function() {
      done();
    })
  }
};
