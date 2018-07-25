import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotes } from '../actions';
import Note from './Note';

class Home extends React.Component {
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
      <div>{notes}</div>
    );
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div>
          <h1>Your notes</h1>
          <Link to='/note/new'>New Note</Link>
          <Link to='logout'>Logout</Link>
        </div>
        {this.renderNotes()}
        <button type="button" onClick={this.getMoreNotes}>Get more</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(Home);
