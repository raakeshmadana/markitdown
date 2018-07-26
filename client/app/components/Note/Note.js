import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteNoteFromServer } from '../../actions';
import './Note.css';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this);
  }

  deleteNote() {
    this.props.dispatch(deleteNoteFromServer(this.props.id));
  }

  render() {
    let link = 'note/' + this.props.id + '/view';
    let date = new Date(this.props.timestamp);
    if(this.props.note.length == 0) {
      return (
        <div className="note">
          <Link to={link} className="link"><big><i>Empty Note</i></big></Link>
          <p>
            <small className="time">{date.toDateString() + " " + date.toLocaleTimeString()}</small>
            <button type="button" onClick={this.deleteNote} className="btn btn-link delete">Delete</button>
          </p>
          <hr/>
        </div>
      )
    } else {
      let lines = this.props.note.split("\n");
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
        <div className="note">
          <Link to={link} className="link"><big>{slicedLines[0]}</big></Link>
          <p>{slicedLines[1]}</p>
          <p>{slicedLines[2]}</p>
          <p>
            <small className="time">{date.toDateString() + " " + date.toLocaleTimeString()}</small>
            <button type="button" onClick={this.deleteNote} className="btn btn-link delete">Delete</button>
          </p>
          <hr/>
        </div>
      )
    }
  }
}

export default connect()(Note);
