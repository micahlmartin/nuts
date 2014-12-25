/**
 * @jsx React.DOM
 */

var React                   = require('react/addons');
var Alert                   = require('react-bootstrap/Alert');
var _                       = require('lodash');
var uuid                    = require('node-uuid');
var CSSTransitionGroup      = React.addons.CSSTransitionGroup;
var NotificationConstants   = require('../../constants/notification');


var Flash = React.createClass({

  getInitialState: function() {

    var flash = this.props.flash || {}

    var items = [];

    var formatMessages = function(data, style) {
      _.each(data || [], function(item) {
        items.push({style: style, message: item});
      })
    };

    formatMessages(flash.success, 'success');
    formatMessages(flash.warning, 'warning');
    formatMessages(flash.error, 'danger');
    formatMessages(flash.info, 'info');

    return {
      items: items,
      transitionLeave: true,
      transitionEnter: true
    }
  },

  handleDismiss: function(i) {
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.replaceState({items: newItems});
  },

  _onFlash: function() {
    var flashMessage = require('../../stores/notification').get('flash');
    this.replaceState({
      items: [{
        style: (flashMessage.type == 'error' ? 'danger' : flashMessage.type),
        message: flashMessage.message
      }],
      transitionLeave: true
    });
  },

  _onClearFlash: function() {
    this.replaceState({items: [], transitionLeave: false});
  },

  componentDidMount: function() {
    require('../../stores/notification').on(NotificationConstants.FLASH, this._onFlash);
    require('../../stores/notification').on(NotificationConstants.CLEAR_FLASH, this._onClearFlash);
  },

  componentWillUnmount: function() {
    require('../../stores/notification').off(NotificationConstants.FLASH, this._onFlash);
    require('../../stores/notification').off(NotificationConstants.CLEAR_FLASH, this._onClearFlash);
  },

  render: function() {
    var self = this;
    var alerts = [];

    var items = this.state.items.map(function(item, i) {
      return (
        <Alert key={JSON.stringify(item)} bsStyle={item.style} onDismiss={self.handleDismiss.bind(self, i)} dismissAfter={5000}>
        {item.message}
        </Alert>
      )
    });

    return (
      <CSSTransitionGroup transitionLeave={this.state.transitionLeave} transitionEnter={this.state.transitionEnter} transitionName="alert">
        {items}
      </CSSTransitionGroup>
    );
  }

});

module.exports = Flash;