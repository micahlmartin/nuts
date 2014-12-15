/**
 * @jsx React.DOM
 */

var React                   = require('react/addons');
var Alert                   = require('react-bootstrap/Alert');
var _                       = require('lodash');
var uuid                    = require('node-uuid');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;


var Flash = React.createClass({

  getInitialState: function() {

    var flash = this.props.flash || {}
    var items = [];

    var formatMessages = function(data, style) {
      _.each(data || [], function(item) {
        items.push({style: style, message: item.message});
      })
    }

    formatMessages(flash.success, 'success');
    formatMessages(flash.warning, 'warning');
    formatMessages(flash.error, 'danger');
    formatMessages(flash.info, 'info');

    return {
      items: items
    }
  },

  handleDismiss: function(i) {
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },

  render: function() {
    var self = this;
    var alerts = [];

    var items = this.state.items.map(function(item, i) {
      return (
        <Alert key={item.style + item.message} bsStyle={item.style} onDismiss={self.handleDismiss.bind(self, i)} dismissAfter={3000}>
        {item.message}
        </Alert>
      )
    });

    return (
      <CSSTransitionGroup transitionName="alert">
        {items}
      </CSSTransitionGroup>
    );
  }

});

module.exports = Flash;