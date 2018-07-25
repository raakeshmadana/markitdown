import React from 'react';
import { Link } from 'react-router-dom';

const Note = (props) => {
  let link = 'note/' + props.id + '/view';
  let date = new Date(props.timestamp);
  if(props.note.length == 0) {
    return (
      <div>
        <Link to={link}><i>Empty Note</i></Link>
        <div>{date.toDateString() + " " + date.toLocaleTimeString()}</div>
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
      <div>
        <Link to={link}>{slicedLines[0]}</Link>
        <div>{slicedLines[1]}</div>
        <div>{slicedLines[2]}</div>
        <div>{date.toDateString() + " " + date.toLocaleTimeString()}</div>
        <hr/>
      </div>
    )
  }
};

export default Note;
