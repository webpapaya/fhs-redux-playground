import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createMemoizeMiddleware from 'redux-memoize';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { BrowserRouter as Router } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './app';

const rootReducer = combineReducers({
    users: require('./domain/users/reducer').default,
    moneyTransactions: require('./domain/money-transactions/reducer').default,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
      ReduxThunk,
      createMemoizeMiddleware({ ttl: 9999999 }),
    )),
);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)