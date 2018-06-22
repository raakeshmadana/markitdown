import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp } from '../actions';

class SignUpForm extends React.Component {
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
    //alert('Works');
    event.preventDefault();
    this.props.signUp(this.state.email, this.state.password);
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input type="text" placeholder="Email" value={this.state.email} onChange={this.setEmail} />
        <input type="password" placeholder="Password" value={this.state.password} onChange={this.setPassword} />
        <input type="submit" value="Sign up" />
      </form>
    );
  }
}

SignUpForm.propTypes = {
	signUp: PropTypes.number.func
}

//export default connect()(SignUpForm);

const mapDispatchToProps = { signUp }

export default connect(null, mapDispatchToProps)(SignUpForm)
