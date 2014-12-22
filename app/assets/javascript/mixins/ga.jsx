/**
* @jsx React.DOM
*/

var React = require('react');

var GA = {
  pageView: function() {
    ga('send', 'pageview', window.location.pathname + window.location.search);
  },
}

module.exports = GA;