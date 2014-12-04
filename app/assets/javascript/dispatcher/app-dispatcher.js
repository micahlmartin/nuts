"use strict";

var _ = require('lodash');
var Backbone = require('backbone');

var AppDispatcher = _.extend({}, Backbone.Events);

module.exports = AppDispatcher;
