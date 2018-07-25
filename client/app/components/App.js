import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Form from './Form'
import Home from './Home'
import LogOut from './LogOut'
import NewNote from './NewNote'
import EditNote from './EditNote'
import ViewNote from './ViewNote'

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path='/' render={(props) => <Form {...props} signUp={true} />} />
      <Route exact path='/login' render={(props) => <Form {...props} signUp={false} />} />
      <Route exact path='/logout' component={LogOut} />
      <Route exact path='/home' component={Home} />
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
