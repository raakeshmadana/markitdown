import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotes } from '../actions';

class Home extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getNotes());
  }
  
  renderNotes() {
    const notes = this.props.notes.map(
      note => {
        let link = 'note/' + note._id + '/view';
        if(note.note.length == 0) {
          return (
            <div>
              <Link to={link}><i>Empty Note</i></Link>
              <hr/>
            </div>
          )
        } else {
          let lines = note.note.split("\n");
          return (
            <div>
              <Link to={link}>{lines[0]}</Link>
              <div>{lines[1]}</div>
              <div>{lines[2]}</div>
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
    return (
      <div>
        <div>
          <h1>Your notes</h1>
          <Link to='/note/new'>New Note</Link>
          <Link to='logout'>Logout</Link>
        </div>
        {this.renderNotes()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes
});

export default connect(mapStateToProps)(Home);
