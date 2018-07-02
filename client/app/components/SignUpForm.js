import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../actions';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      canSubmit: false,
      emailError: '',
      passwordError: ''
    };

    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.setEmailError = this.setEmailError.bind(this);
    this.setPasswordError = this.setPasswordError.bind(this);
    this.clearEmailError = this.clearEmailError.bind(this);
    this.clearPasswordError =this.clearPasswordError.bind(this);
    this.submit = this.submit.bind(this);
  }

  checkEmail(event) {
    this.setState({email: event.target.value});
    if (!this.state.email.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi)) {
      this.enableButton();
      this.clearEmailError();
    } else {
      this.disableButton();
      this.setEmailError();
    }
  }

  checkPassword(event) {
    this.setState({password: event.target.value});
    if (this.state.password.length >=8) {
      this.enableButton();
      this.clearPasswordError();
    } else {
      this.disableButton();
      this.setPasswordError();
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
    this.props.dispatch(signUp(this.state.email, this.state.password));
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.submit}>
          <input type="text" placeholder="Email" value={this.state.email} onChange={this.checkEmail} />
          <span>{this.state.emailError}</span>
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.checkPassword} />
          <span>{this.state.passwordError}</span>
          <input type="submit" value="Sign up" disabled={!this.state.canSubmit}/>
        </form>
        <Link to='/login'>Log In</Link>
      </div>
    );
  }
}

export default connect()(SignUpForm)
