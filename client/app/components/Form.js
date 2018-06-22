import React from 'react';

class Form extends React.Component {
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
    alert('Email: ' + this.state.email + '\nPassword: ' + this.state.password);
    event.preventDefault();
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

export default Form;
