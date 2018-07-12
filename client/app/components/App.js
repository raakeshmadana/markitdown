import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'
import Home from './Home'
import LogOut from './LogOut'
import AddNote from './AddNote'
import Note from './Note'
import EditNote from './EditNote'
import ViewNote from './ViewNote'

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path='/' component={SignUpForm} />
      <Route exact path='/login' component={LogInForm} />
      <Route exact path='/logout' component={LogOut} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/addnote' component={AddNote} />
      <Route exact path='/note/:id' component={Note} />
      <Route exact path='/note/:id/edit' component={EditNote} />
      <Route exact path='/note/:id/view' component={ViewNote} />
    </div>
  </ConnectedRouter>
)

App.propTypes = {
  history: PropTypes.object,
}

export default App
