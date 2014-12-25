/**
* @jsx React.DOM
*/

var React             = require('react');
var Link              = require('react-router').Link;
var Navigation  = require('react-router').Navigation;
var GA                = require('../../mixins/ga.jsx');
var ValidationMessage = require('../../mixins/validation-message.jsx');
var CSRF              = require('../shared/csrf.jsx');
var Col               = require('react-bootstrap/Col');
var Button            = require('react-bootstrap/Button');
var Input             = require('react-bootstrap/Input');


var PasswordReset = React.createClass({

  mixins: [Navigation, GA, ValidationMessage],

  getInitialState: function() {
    return {
      password: '',
      passwordConfirmation: '',
      validationErrors: {},
      id: this.props.id
    };
  },

  _onSuccess: function() {
    require('../../actions/notification').flash('success', "Your password has been reset successfully.");
    this.transitionTo('login');
  },

  _onFail: function() {
    require('../../actions/notification').flash('error', 'Something went wrong while trying to update your password.')
  },

  componentDidMount: function() {
    require('../../stores/session').on('reset:fail', this._onFail);
    require('../../stores/session').on('reset:success', this._onSuccess);
    this.refs.password.refs.input.getDOMNode().focus();
    this.pageView();
  },

  componentWillUnmount: function() {
    require('../../stores/session').off('reset:fail', this._onFail);
    require('../../stores/session').off('reset:success', this._onSuccess);
  },

  passwordChanged: function(e) {
    this.setState({password: e.target.value});
  },

  passwordConfirmationChanged: function(e) {
    this.setState({passwordConfirmation: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var password = this.refs.password.refs.input.getDOMNode().value.trim();
    var passwordConfirmation = this.refs.passwordConfirmation.refs.input.getDOMNode().value.trim();
    var id = this.refs.id.getDOMNode().value.trim();
    require('../../actions/session').resetPassword(password, passwordConfirmation, id);
  },

  render: function() {
    return (
      <div>
        <div className="page-header">
          <h3>Change Password</h3>
        </div>
        <Col xsOffset={2} xs={8}>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <CSRF value={this.props.csrf} />
            <input ref="id" type="hidden" name="id" value={this.state.id} />
            <Input
              type="password"
              ref="password"
              bsStyle={this.getInputStyle("password")}
              title={this.getValidationMessage('password')}
              onChange={this.passwordChanged}
              value={this.state.password}
              label="New Password"
              hasFeedback  />
            <Input
              type="password"
              bsStyle={this.getInputStyle("passwordConfirmation")}
              title={this.getValidationMessage('passwordConfirmation')}
              ref="passwordConfirmation"
              onChange={this.passwordConfirmationChanged}
              value={this.state.passwordConfirmation}
              label="Confirm Password"
              hasFeedback  />
            <div className="form-group">
              <Button type="submit" bsStyle="success">Send password reset email</Button>
            </div>
          </form>
        </Col>
      </div>
    );
  }

});

module.exports = PasswordReset;
