import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './app';

const rootReducer = combineReducers({
    users: require('./domain/users/reducer').default,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(ReduxThunk)
    )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)