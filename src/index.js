import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createMemoizeMiddleware } from './lib/memoize-actions';
import App from './app';
import { Locale } from './lib/i18n';


const rootReducer = combineReducers({
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(
		ReduxThunk,
		createMemoizeMiddleware,
	)),
);

render(
	<Provider store={store}>
		<Router>
			<Locale>
				<App />
			</Locale>
		</Router>
	</Provider>,
	document.getElementById('app'),
);
