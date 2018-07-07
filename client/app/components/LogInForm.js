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
      password: '',
      canSubmit: false,
      emailTouched: false,
      passwordTouched: false,
      emailError: '',
      passwordError: ''
    };

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.setEmailError = this.setEmailError.bind(this);
    this.setPasswordError = this.setPasswordError.bind(this);
    this.clearEmailError = this.clearEmailError.bind(this);
    this.clearPasswordError =this.clearPasswordError.bind(this);
    this.submit = this.submit.bind(this);
  }

  setEmail(event) {
    this.setState({email: event.target.value});
    this.setState({emailTouched: true});
    if (!event.target.value.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi)) {
      this.clearEmailError();
      if (this.state.passwordError.length == 0 && this.state.passwordTouched) {
        this.enableButton();
      }
    } else {
      this.setEmailError();
      this.disableButton();
    }
  }

  setPassword(event) {
    this.setState({password: event.target.value});
    this.setState({passwordTouched: true});
    if (event.target.value.length >=8) {
      this.clearPasswordError();
      if (this.state.emailError.length == 0 && this.state.emailTouched) {
        this.enableButton();
      }
    } else {
      this.setPasswordError();
      this.disableButton();
    }
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  setEmailError() {
    this.setState({emailError: 'Enter a valid email'});
  }

  setPasswordError() {
    this.setState({passwordError: 'Should be atleast 8 characters long'});
  }

  clearEmailError() {
    this.setState({emailError: ''});
  }

  clearPasswordError() {
    this.setState({passwordError: ''});
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
          <span>{this.state.emailError}</span>
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword} />
          <span>{this.state.passwordError}</span>
          <input type="submit" value="Log In" disabled={!this.state.canSubmit}/>
        </form>
        <Link to="/">Sign Up</Link>
      </div>
    );
  }
}

export default connect()(LogInForm)
