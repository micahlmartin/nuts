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
        items.push({style: style, message: item});
      })
    };

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

  _onFlash: function() {
    var flashMessage = require('../../stores/notification').get('flash');
    this.setState({
      items: [{
        style: (flashMessage.type == 'error' ? 'danger' : flashMessage.type),
        message: flashMessage.message
      }]
    });
  },

  componentDidMount: function() {
    require('../../stores/notification').on('flash', this._onFlash);
  },

  render: function() {
    var self = this;
    var alerts = [];

    var items = this.state.items.map(function(item, i) {
      return (
        <Alert key={JSON.stringify(item)} bsStyle={item.style} onDismiss={self.handleDismiss.bind(self, i)}>
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