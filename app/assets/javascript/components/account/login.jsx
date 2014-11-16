/**
 * @jsx React.DOM
 */

var React = require('react');
var CSRF = require('../shared/csrf.jsx');

var Login = React.createClass({

  getInitialState: function() {
    return {
      email: this.props.email || '',
      password: this.props.password || '',
      passwordConfirmation: this.props.passwordConfirmation || '',
    };
  },

  render: function() {
    return (
      <div>
        <div className="page-header">
           <h3>Sign up</h3>
        </div>
        <form id="signup-form" method="POST" className="form-horizontal">
           <CSRF value={this.props.csrf} />
           <div className="form-group">
              <label htmlFor="email" className="col-sm-3 control-label">Email</label>
              <div className="col-sm-7">
                <input type="email" value={this.state.email} name="email" id="email" placeholder="Email" autofocus className="form-control" />
              </div>
           </div>
           <div className="form-group">
              <label htmlFor="password" className="col-sm-3 control-label">Password</label>
              <div className="col-sm-7">
                <input type="password" name="password" id="password" placeholder="Password" className="form-control" />
              </div>
           </div>
           <div className="form-group">
              <label htmlFor="confirmPassword" className="col-sm-3 control-label">Confirm Password</label>
              <div className="col-sm-7">
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" className="form-control" />
              </div>
           </div>
           <div className="form-group">
              <div className="col-sm-offset-3 col-sm-7">
                <button type="submit" className="btn btn-success">
                  <span className="ion-person-add"></span>Signup
                </button>
              </div>
           </div>
        </form>
      </div>
    );
  }

});

module.exports = Login;