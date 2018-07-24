import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import highlightjs from 'highlight.js';
import './github.css';

class ViewNote extends React.Component {
  constructor(props) {
    super(props);
    this.codeRef = React.createRef();
    this.renderHTML = this.renderHTML.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }

  componentDidMount() {
    if(this.props.loggedIn) {
      highlightjs.highlightBlock(this.codeRef.current);
    }
  }

  componentDidUpdate() {
    highlightjs.highlightBlock(this.codeRef.current);
  }

  createMarkup(preview) {
    return { __html: preview };
  }

  renderHTML() {
    for(let i = 0; i < this.props.notes.length; i++) {
      if(this.props.notes[i]._id == this.props.match.params.id) {
        let str = '/note/' + this.props.match.params.id + '/edit';
        return (
          <div>
            <Link to={str}>Edit</Link>
            <div dangerouslySetInnerHTML={this.createMarkup(this.props.notes[i].preview)} ref={this.codeRef} />
          </div>
        );
      }
    }
  }

  render() {
    if(!this.props.loggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div>
        {this.renderHTML()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(ViewNote);
