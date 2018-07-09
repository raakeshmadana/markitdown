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

  render() {
    return (
      <div>
        <div>
          <h1>Your notes</h1>
          <Link to='addnote' target='_blank'>Add Note</Link>
          <Link to='logout'>Logout</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes
});

export default connect(mapStateToProps)(Home);
