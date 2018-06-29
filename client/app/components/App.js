import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import SignUpForm from './SignUpForm'

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path='/' component={SignUpForm} />
    </div>
  </ConnectedRouter>
)

App.propTypes = {
  history: PropTypes.object,
}

export default App
