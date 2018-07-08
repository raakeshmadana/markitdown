import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveNote } from '../actions';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.noteRef = React.createRef();
    this.saveNote = this.saveNote.bind(this);
    //setInterval(this.saveNote, 10000);
  }

  saveNote(){
    this.props.dispatch(saveNote(this.props.params.id, this.noteRef.current.innerText));
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.saveNote}>Save</button>
        <div contentEditable="true" ref={this.noteRef}>
        </div>
      </div>
    );
  }
}

export default connect()(Note);
