import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, logIn, clearError } from '../actions';

class Form extends React.Component {
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

  componentDidMount() {
    if (this.props.logInError) {
      this.props.dispatch(clearError());
    }
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
      this.disableButton();
      this.setEmailError();
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
    if(this.props.signUp) {
      this.props.dispatch(signUp(this.state.email, this.state.password));
    } else {
      this.props.dispatch(logIn(this.state.email, this.state.password));
    }
  }

  render() {
    if(this.props.loggedIn) {
      return <Redirect to="/home" />
    }
    return (
      <div>
        <h3>{this.props.signUp ? "Sign Up" : "Log In"}</h3>
        <form onSubmit={this.submit}>
          <input type="text" placeholder="Email" value={this.state.email} onChange={this.setEmail} />
          <span>{this.state.emailError}</span>
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword} />
          <span>{this.state.passwordError}</span>
          <input type="submit" value={this.props.signUp ? "Sign Up" : "Log In"} disabled={!this.state.canSubmit}/>
          {
            this.props.signUp ?
              (<span>{this.props.logInError ? 'User already exists' : ''}</span>) :
              (<span>{this.props.logInError ? 'Credentials Incorrect' : ''}</span>)
          }
        </form>
        {this.props.signUp ? (<Link to='/login'>Log In</Link>) : (<Link to='/'>Sign Up</Link>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  logInError: state.logInError
});

export default connect(mapStateToProps)(Form);