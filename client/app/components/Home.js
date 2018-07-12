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
        let str = 'note/' + note._id + '/view';
        return (
          <div>
            <Link to={str}>{note._id}</Link>
          </div>
        )
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
          <Link to='addnote'>Add Note</Link>
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
