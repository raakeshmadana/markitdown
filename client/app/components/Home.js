import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotes } from '../actions';

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
      note => {
        let link = 'note/' + note._id + '/view';
        let date = new Date(note.timestamp);
        if(note.note.length == 0) {
          return (
            <div>
              <Link to={link}><i>Empty Note</i></Link>
              <div>{date.toDateString() + " " + date.toLocaleTimeString()}</div>
              <hr/>
            </div>
          )
        } else {
          let lines = note.note.split("\n");
          let ellipsis = "...";
          const slicedLines = lines.map(
            line => {
              if(line.length > 72) {
                return line.slice(0, 71) + ellipsis;
              } else {
                return line;
              }
            }
          );
          return (
            <div>
              <Link to={link}>{slicedLines[0]}</Link>
              <div>{slicedLines[1]}</div>
              <div>{slicedLines[2]}</div>
              <div>{date.toDateString() + " " + date.toLocaleTimeString()}</div>
              <hr/>
            </div>
          )
        }
      }
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
