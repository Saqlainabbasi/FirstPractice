import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import BooksView from './components/Books';
import Layout from './hoc/Layout';
import Login from './containers/Admin/Login';

const Routes = () => {
	return (
		<Layout>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/books/:id" component={BooksView} />
			</Switch>;
		</Layout>
	);
};

export default Routes;
