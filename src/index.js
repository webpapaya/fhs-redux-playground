import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { BrowserRouter as Router } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './app';

const rootReducer = combineReducers({
    users: require('./domain/users/reducer').default,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)