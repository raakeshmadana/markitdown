import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions';

class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(logOut());
  }
  
  render() {
    return (
      <div>
        <h3>You are being logged out</h3>
      </div>
    );
  }
}

export default connect()(LogOut)
