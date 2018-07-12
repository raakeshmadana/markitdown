import React from 'react';
import { connect } from 'react-redux';
import { newNote } from '../actions';

class NewNote extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(newNote());
  }
  
  render() {
    return (
      <div>
        <h3>Creating note...</h3>
      </div>
    );
  }
}

export default connect()(NewNote);
