import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from './Form';
import './home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    };

  render() {
    if(this.props.loggedIn) {
      return <Redirect to="/notes" />
    }
    return (
      <div id="home">
        <div id="head">
          <h1>Notes</h1>
          <big>Take notes using Markdown</big>
        </div>
        <div>
          <hr/>
          {
            this.state.signUp ?
              (<h3>Sign Up / <button type="button" onClick={this.toggleForm} className="btn btn-link"><h3>Log In</h3></button></h3>) :
              (<h3><button type="button" onClick={this.toggleForm} className="btn btn-link"><h3>Sign Up</h3></button> / Log In</h3>)
          }
        </div>
        <Form />
      </div>
    );
  }
}

export default Home;
