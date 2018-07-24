import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import reducer from './reducers';

const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  connectRouter(history)(persistedReducer),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  )
);

export const persistor = persistStore(store);

ReactDOM.render(
  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App history={history} />
      </PersistGate>
    </Provider>
  ),
  document.getElementById('container')
);
