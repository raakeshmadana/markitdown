import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, logIn, clearError } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: true,
      email: '',
      password: '',
      canSubmit: false,
      emailTouched: false,
      passwordTouched: false,
      emailError: '',
      passwordError: ''
    };

    this.toggleForm = this.toggleForm.bind(this);
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

  toggleForm() {
    this.props.dispatch(clearError());
    this.setState({
      signUp: !this.state.signUp,
      email: '',
      password: '',
      canSubmit: false,
      emailTouched: false,
      passwordTouched: false,
      emailError: '',
      passwordError: ''
    });
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
    if(this.state.signUp) {
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
        {
          this.state.signUp ?
            (<h3>Sign Up / <button type="button" onClick={this.toggleForm} className="btn btn-link"><h3>Log In</h3></button></h3>) :
            (<h3><button type="button" onClick={this.toggleForm} className="btn btn-link"><h3>Sign Up</h3></button> / Log In</h3>)
        }
        <form onSubmit={this.submit}>
          <div className="form-group">
            <input type="text" placeholder="Email" value={this.state.email} onChange={this.setEmail} className="form-control" />
            <small className="form-text"><em>{this.state.emailError}</em></small>
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword} className="form-control" />
            <small className="form-text"><em>{this.state.passwordError}</em></small>
          </div>
          <input type="submit" value={this.state.signUp ? "Sign Up" : "Log In"} disabled={!this.state.canSubmit} className="btn btn-primary" />
          {
            this.state.signUp ?
              (<small className="form-text"><em>{this.props.logInError ? 'User already exists' : ''}</em></small>) :
              (<small className="form-text"><em>{this.props.logInError ? 'Credentials Incorrect' : ''}</em></small>)
          }
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  logInError: state.logInError
});

export default connect(mapStateToProps)(Form);
