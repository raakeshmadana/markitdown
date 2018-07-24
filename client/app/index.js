import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import reducer from './reducers';

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(reducer),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  )
);

ReactDOM.render(
  (
    <Provider store={store}>
      <App history={history} />
    </Provider>
  ),
  document.getElementById('container')
);
