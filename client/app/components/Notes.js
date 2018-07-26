import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotes } from '../actions';
import Note from './Note';
import './Notes.css';

class Notes extends React.Component {
  constructor(props){
    super(props);
    this.getMoreNotes = this.getMoreNotes.bind(this);
  }

  componentDidMount() {
    if(this.props.notes.length == 0 && this.props.loggedIn) {
      this.props.dispatch(getNotes(Date.now()));
    }
  }

  getMoreNotes() {
    this.props.dispatch(getNotes(this.props.notes[this.props.notes.length - 1].timestamp));
  }
  
  renderNotes() {
    const notes = this.props.notes.map(
      note => <Note key={note._id} id={note._id} note={note.note} timestamp={note.timestamp} />
    );
    return (
      <div id="notes">{notes}</div>
    );
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand mb-0 h1">Notes</Link>
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
        {this.renderNotes()}
        <button type="button" onClick={this.getMoreNotes} className="btn btn-primary">Get more</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(Notes);
