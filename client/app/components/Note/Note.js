import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

const Note = (props) => {
  let link = 'note/' + props.id + '/view';
  let date = new Date(props.timestamp);
  if(props.note.length == 0) {
    return (
      <div className="note">
        <Link to={link} className="link"><big><i>Empty Note</i></big></Link>
        <small className="time">{date.toDateString() + " " + date.toLocaleTimeString()}</small>
        <hr/>
      </div>
    )
  } else {
    let lines = props.note.split("\n");
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
        <small className="time">{date.toDateString() + " " + date.toLocaleTimeString()}</small>
        <hr/>
      </div>
    )
  }
};

export default Note;
