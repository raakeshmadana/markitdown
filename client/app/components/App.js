import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'
import Home from './Home'
import LogOut from './LogOut'

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path='/' component={SignUpForm} />
      <Route exact path='/login' component={LogInForm} />
      <Route exact path='/logout' component={LogOut} />
      <Route exact path='/home' component={Home} />
    </div>
  </ConnectedRouter>
)

App.propTypes = {
  history: PropTypes.object,
}

export default App
