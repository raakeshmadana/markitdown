import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ViewNote extends React.Component {
  constructor(props) {
    super(props);
    this.renderHTML = this.renderHTML.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }

  createMarkup(preview) {
    return { __html: preview };
  }

  renderHTML() {
    for(let i = 0; i < this.props.notes.length; i++) {
      if(this.props.notes[i]._id == this.props.match.params.id) {
        let str = '/note/' + this.props.match.params.id + '/edit';
        console.log(this.props.notes[i].preview);
        return (
          <div>
            <Link to={str}>Edit</Link>
            <div dangerouslySetInnerHTML={this.createMarkup(this.props.notes[i].preview)} />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div>
        {this.renderHTML()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes
});

export default connect(mapStateToProps)(ViewNote);
