/**
 * @jsx React.DOM
 */

var React       = require('react');
var CSRF        = require('../shared/csrf.jsx');
var GA          = require('../../mixins/ga.jsx');
var GA          = require('../../mixins/validation-message.jsx');
var Input       = require('react-bootstrap/Input');
var Button      = require('react-bootstrap/Button');
var Col         = require('react-bootstrap/Col');
var Alert       = require('react-bootstrap/Alert');
var Link        = require('react-router').Link;
var Navigation  = require('react-router').Navigation;
var _           = require('lodash');

var Login = React.createClass({

  mixins: [Navigation, GA],

  _onChange: function() {
    var newState = _.assign(this.getInitialState(), require('../../stores/session').attributes);
    this.setState(newState);
  },

  getInitialState: function() {
    return {
      isAuthenticated: this.props.isAuthenticated || false,
      error: null,
      validationErrors: {}
    };
  },

  componentWillMount: function() {
    if(this.state.isAuthenticated) {
      this.transitionTo('home');
    }
  },

  componentDidMount: function() {
    require('../../stores/session').on('change', this._onChange);

    // Update the current state right after mounting to make sure
    // that if the user happens to navigate with the back button
    // we're still fircing the redirect if they're logged in.
    var newState = _.assign(this.getInitialState(), require('../../stores/session').attributes);
    this.setState(newState);

    this.refs.email.refs.input.getDOMNode().focus();
    this.pageView();
  },

  componentWillUnmount: function() {
    require('../../stores/session').off('change', this._onChange);
  },

  componentWillUpdate: function(nextProps, nextState) {
    if(nextState.isAuthenticated) {
      require('../../actions/notification').flash('info', 'An email has been sent with an activation link.')
      this.transitionTo('home');
    }

    if(nextState.error) {
      require('../../actions/notification').flash('danger', nextState.error);
    }
  },

  emailChanged: function(e) {
    this.setState({email: e.target.value});
  },

  passwordChanged: function(e) {
    this.setState({password: e.target.value});
  },

  passwordConfirmationChanged: function(e) {
    this.setState({passwordConfirmation: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.refs.input.getDOMNode().value.trim();
    var password = this.refs.password.refs.input.getDOMNode().value.trim();
    var passwordConfirmation = this.refs.passwordConfirmation.refs.input.getDOMNode().value.trim();
    var terms = this.refs.terms.refs.input.getDOMNode().checked;
    require('../../actions/session').signup(email, password, passwordConfirmation, terms);
  },

  render: function() {
    return (
      <div>
        <div className="page-header">
           <h3>Sign up</h3>
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
              label="Email" />
            <Input
              type="password"
              ref="password"
              bsStyle={this.getInputStyle("password")}
              title={this.getValidationMessage('password')}
              label="Password"
              onChange={this.passwordChanged}
              value={this.state.password}  />
            <Input
              type="password"
              ref="passwordConfirmation"
              bsStyle={this.getInputStyle("passwordConfirmation")}
              title={this.getValidationMessage('passwordConfirmation')}
              label="Confirm Password"
              onChange={this.passwordConfirmationChanged}
              value={this.state.passwordConfirmation} />
            <Input
              type="checkbox"
              ref="terms"
              bsStyle={this.getInputStyle("terms")}
              title={this.getValidationMessage('terms')}
              label="I have read and accept the terms of service"
              onChange={this.acceptTermsChanged}
              value={this.state.acceptedTerms} />
            <div className="form-group">
              <Button type="submit" bsStyle="success">Signup</Button>
            </div>
          </form>
        </Col>
      </div>
    );
  }

});

module.exports = Login;
