// Global Backbone Config
var Backbone      = require('backbone');
var validation    = require('backbone.validation');
var _             = require('lodash');

_.extend(Backbone.Model.prototype, validation.mixin);
