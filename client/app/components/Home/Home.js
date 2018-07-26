import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from '../Form';
import './Home.css';

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
        <Form />
      </div>
    );
  }
}

export default Home;
