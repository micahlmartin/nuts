/**
 * @jsx React.DOM
 */

var React       = require('react');
var CSRF        = require('../shared/csrf.jsx');
var GA          = require('../../mixins/ga.jsx');
var Input       = require('react-bootstrap/Input');
var Row         = require('react-bootstrap/Row');
var Col         = require('react-bootstrap/Col');
var Button      = require('react-bootstrap/Button');
var Alert       = require('react-bootstrap/Alert');
var Link        = require('react-router').Link;
var Navigation  = require('react-router').Navigation;
var _           = require('lodash');

var Login = React.createClass({

  mixins: [Navigation, GA],

  _onChange: function() {
    var newState = _.assign(this.getInitialState(), require('../../stores/session').attributes);
    this.setState(newState);
    this.refs.email.refs.input.getDOMNode().focus();
  },

  getInitialState: function() {
    return {
      isAuthenticated: false,
      email: '',
      password: '',
      error: null
    };
  },

  componentDidMount: function() {
    require('../../stores/session').on('change', this._onChange);

    // Update the current state right after mounting to make sure
    // that if the user happens to navigate with the back button
    // we're still fircing the redirect if they're logged in.
    var newState = require('../../stores/session').attributes;
    this.setState(newState);

    this.refs.email.refs.input.getDOMNode().focus();
    this.pageView();
  },

  componentWillUnmount: function() {
    require('../../stores/session').off('change', this._onChange);
  },

  componentWillUpdate: function(nextProps, nextState) {
    if(nextState.isAuthenticated) {
      require('../../actions/notification').clearFlash();
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

  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.refs.input.getDOMNode().value.trim();
    var password = this.refs.password.refs.input.getDOMNode().value.trim();
    require('../../actions/session').login(email, password);
  },

  render: function() {

    return (
      <div>
        <div className="page-header">
          <h3>Login</h3>
        </div>
        <Col xsOffset={2} xs={8}>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <CSRF value={this.props.csrf} />
            <Input type="email" ref="email" onChange={this.emailChanged} value={this.state.email} label="Email" hasFeedback  />
            <Input type="password" ref="password" onChange={this.passwordChanged} value={this.state.password} label="Password" hasFeedback  />
            <div className="form-group">
              <Button type="submit" bsStyle="success">Login</Button>
              <Link className="btn btn-link" to="forgot">Forgot your password?</Link>
            </div>
          </form>
        </Col>
      </div>
    );
  }

});

module.exports = Login;
