import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import reducers from './Store/reducers';
import Routes from './routes';

const reduxStore = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDom.render(
	<Provider store={reduxStore(reducers)}>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
