/**
 * @jsx React.DOM
 */

var React = require('react');
var CSRF = require('../shared/csrf.jsx');
var Input = require('react-bootstrap/Input');

var Login = React.createClass({

  _onChange: function() {
    this.setState(require('../../assets/javascript/stores/session').attributes);
  },

  getInitialState: function() {
    return {
      email: this.props.email || '',
      password: this.props.password || '',
      passwordConfirmation: this.props.passwordConfirmation || '',
    };
  },

  componentDidMount: function() {
    require('../../assets/javascript/stores/session').on('change', this._onChange);
  },

  componentWillUnmount: function() {
    require('../../assets/javascript/stores/session').off('change', this._onChange);
  },

  validationState: function() {
    return '';
  },

  emailChanged: function(e) {
    this.setState({email: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.refs.input.getDOMNode().value.trim();
    var password = this.refs.password.refs.input.getDOMNode().value.trim();
    require('../../assets/javascript/actions/session').login(email, password);
  },

  render: function() {
    return (
      <div>
        <div className="page-header">
           <h3>Login</h3>
        </div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
           <CSRF value={this.props.csrf} />
           <Input type="email" ref="email" onChange={this.emailChanged} labelClassName="col-xs-2" wrapperClassName="col-xs-5" value={this.state.email} label="Email" bsStyle={this.validationState()} hasFeedback  />
           <Input type="password" ref="password" labelClassName="col-xs-2" wrapperClassName="col-xs-5" label="Password" bsStyle={this.validationState()} hasFeedback  />
           <div className="form-group">
              <div className="col-sm-offset-3 col-sm-7">
                <button type="submit" className="btn btn-success">
                  <span className="ion-person-add"></span>Login
                </button>
              </div>
           </div>
        </form>
      </div>
    );
  }

});

module.exports = Login;
