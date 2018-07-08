import React from 'react';
import { connect } from 'react-redux';
import { addNote } from '../actions';

class AddNote extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(addNote());
  }
  
  render() {
    return (
      <div>
        <h3>Creating note...</h3>
      </div>
    );
  }
}

export default connect()(AddNote);
