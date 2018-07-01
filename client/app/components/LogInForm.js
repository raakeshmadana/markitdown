import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn } from '../actions';

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  setEmail(event) {
    this.setState({email: event.target.value});
  }

  setPassword(event) {
    this.setState({password: event.target.value});
  }

  submit(event) {
    event.preventDefault();
    this.props.dispatch(logIn(this.state.email, this.state.password));
  }

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={this.submit}>
          <input type="text" placeholder="Email" value={this.state.email} onChange={this.setEmail} />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword} />
          <input type="submit" value="Log In" />
        </form>
        <Link to="/">Sign Up</Link>
      </div>
    );
  }
}

export default connect()(LogInForm)
