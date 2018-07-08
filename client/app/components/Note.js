import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveNote } from '../actions';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.noteRef = React.createRef();
    this.save = this.save.bind(this);
    setInterval(this.save, 30000);
  }

  save(){
    this.props.dispatch(saveNote(this.props.match.params.id, this.noteRef.current.innerText));
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.save}>Save</button>
        <div contentEditable="true" ref={this.noteRef}>
        </div>
      </div>
    );
  }
}

export default connect()(Note);
