import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Home from './Home'
import Notes from './Notes'
import LogOut from './LogOut'
import NewNote from './NewNote'
import EditNote from './EditNote'
import ViewNote from './ViewNote'

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/logout' component={LogOut} />
      <Route exact path='/notes' component={Notes} />
      <Route exact path='/note/new' component={NewNote} />
      <Route exact path='/note/:id/edit' component={EditNote} />
      <Route exact path='/note/:id/view' component={ViewNote} />
    </div>
  </ConnectedRouter>
)

App.propTypes = {
  history: PropTypes.object,
}

export default App
