
var $ = require('jquery');

$.ajaxSetup({cache: false});

var csrfToken = $('meta[name="csrf"]').attr("content");

module.exports = {
  csrf: csrfToken
};
