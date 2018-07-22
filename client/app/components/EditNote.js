import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveNote, previewNote } from '../actions';
import { push } from 'connected-react-router';

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.noteRef = React.createRef();
    this.preview = this.preview.bind(this);
    this.update = this.update.bind(this);
    this.renderMD = this.renderMD.bind(this);
    setInterval(this.updateServer, 30000);
  }

  preview() {
    this.props.dispatch(previewNote(this.props.match.params.id, this.noteRef.current.innerText));
  }

  update() {
    this.props.dispatch(saveNote(this.props.match.params.id, this.noteRef.current.innerText));
  }

  renderMD() {
    const divStyle = {
      whiteSpace: "pre-wrap"
    };
    for(let i = 0; i < this.props.notes.length; i++) {
      if(this.props.notes[i]._id == this.props.match.params.id) {
        return (
          <div contentEditable="true" style={divStyle} ref={this.noteRef}>
            {this.props.notes[i].note}
          </div>
        );
      }
    }
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <button type="button" onClick={this.preview}>Preview</button>
        <button type="button" onClick={this.update}>Save</button>
        {this.renderMD()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(EditNote);
