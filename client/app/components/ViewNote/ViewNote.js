import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteNoteFromServer } from '../../actions';
import highlightjs from 'highlight.js';
import './ViewNote.css';

class ViewNote extends React.Component {
  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this);
    this.renderHTML = this.renderHTML.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.applySyntaxHighlighting = this.applySyntaxHighlighting.bind(this);
  }

  componentDidMount() {
    if(this.props.loggedIn) {
      this.applySyntaxHighlighting();
    }
  }

  componentDidUpdate() {
    this.applySyntaxHighlighting();
  }

  deleteNote() {
    this.props.dispatch(deleteNoteFromServer(this.props.match.params.id));
  }

  applySyntaxHighlighting() {
    let codeBlocks = document.getElementsByTagName('code');
    for(let i = 0; i < codeBlocks.length; i++) {
      highlightjs.highlightBlock(codeBlocks[i].parentElement);
    }
  }

  createMarkup(preview) {
    return { __html: preview };
  }

  renderHTML() {
    for(let i = 0; i < this.props.notes.length; i++) {
      if(this.props.notes[i]._id == this.props.match.params.id) {
        let str = '/note/' + this.props.match.params.id + '/edit';
        return (
          <div>
            <Link to={str} className="btn btn-primary">Edit</Link>
            <button type="button" onClick={this.deleteNote} className="btn btn-danger">Delete</button>
            <div id="preview" dangerouslySetInnerHTML={this.createMarkup(this.props.notes[i].preview)} />
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/notes" className="navbar-brand mb-0 h1">MarkitDown</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to='/note/new' className="nav-item nav-link">New Note</Link>
              <Link to='/logout' className="nav-item nav-link">Logout</Link>
            </div>
          </div>
        </nav>
        {this.renderHTML()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(ViewNote);
