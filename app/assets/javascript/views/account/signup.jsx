/**
 * @jsx React.DOM
 */

var React   = require('react');
var CSRF    = require('../shared/csrf.jsx');
var Input   = require('react-bootstrap/Input');
var Button  = require('react-bootstrap/Button');
var Col     = require('react-bootstrap/Col');
var Alert   = require('react-bootstrap/Alert');
var Link    = require('react-router').Link;

var Login = React.createClass({

  getInitialState: function() {
    return {
      email: this.props.email || '',
      password: '',
      passwordConfirmation: '',
      error: null
    };
  },

  componentDidMount: function() {
    require('../../stores/session').on('change', this._onChange);
    this.refs.email.refs.input.getDOMNode().focus();
  },

  componentWillUnmount: function() {
    require('../../stores/session').off('change', this._onChange);
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
          <Alert className={this.state.error ? '' : 'hidden'} bsStyle="danger">{this.state.error}</Alert>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
             <CSRF value={this.props.csrf} />
             <Input type="email" ref="email" onChange={this.emailChanged} value={this.state.email} label="Email" hasFeedback  />
             <Input type="password" ref="password" label="Password" onChange={this.passwordChanged} value={this.state.password} hasFeedback  />
             <Input type="password" ref="passwordConfirmation" label="Confirm Password" onChange={this.passwordConfirmationChanged} value={this.state.passwordConfirmation} hasFeedback  />
             <Input type="checkbox" ref="terms" label="I have read and accept the terms of service" onChange={this.acceptTermsChanged} value={this.state.acceptedTerms} hasFeedback />
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
