/**
* @jsx React.DOM
*/

var React             = require('react');
var Link              = require('react-router').Link;
var Navigation        = require('react-router').Navigation;
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
      email: '',
      validationErrors: {}
    };
  },

  _onFail: function() {
    require('../../actions/notification').flash('danger', "There is no account with that email address");
  },

  _onSuccess: function() {
    require('../../actions/notification').flash('success', "An email has been sent to " + this.state.email + " with a link to reset your password.");
    this.transitionTo("/login");
  },

  componentDidMount: function() {
    require('../../stores/session').on('forgot:fail', this._onFail);
    require('../../stores/session').on('forgot:success', this._onSuccess);
    this.pageView();
  },

  componentWillUnmount: function() {
    require('../../stores/session').off('forgot:fail', this._onFail);
    require('../../stores/session').off('forgot:success', this._onSuccess);
  },

  emailChanged: function(e) {
    this.setState({email: e.target.value});
  },


  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.refs.input.getDOMNode().value.trim();
    require('../../actions/session').forgotPassword(email);
  },

  render: function() {
    return (
      <div>
        <div className="page-header">
          <h3>Forgot Password</h3>
        </div>
        <Col xsOffset={2} xs={8}>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <CSRF value={this.props.csrf} />
            <Input
              type="email"
              ref="email"
              bsStyle={this.getInputStyle("email")}
              title={this.getValidationMessage('email')}
              onChange={this.emailChanged}
              value={this.state.email}
              label="Email"
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
