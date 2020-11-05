import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import BooksView from './components/Books';
import Layout from './hoc/Layout';
import Login from './containers/Admin/Login';
import Auth from './hoc/auth'
import User from './components/Admin';
import AddReview from './containers/Admin/AddReview';
import UserPost from './components/Admin/UserPost';
import EditReview from './containers/Admin/EditReview';
import RegisterUser from './containers/Admin/RegisterUser';
import Logout from './components/Admin/Logout';

// eslint-disable-next-line
//switch statement will pass as children props to the Layout component

const Routes = () => {
	return (
		<Layout>
			<Switch>
				<Route exact path="/" component={Auth(Home,null)} />
				<Route exact path="/login" component={Auth(Login,false)} />
				<Route exact path="/user" component={Auth(User,true)} />
				<Route exact path="/user/add" component={Auth(AddReview,true)} />
				<Route exact path="/user/logout" component={Auth(Logout,true)} />
				<Route exact path="/user/register" component={Auth(RegisterUser,true)} />
				<Route exact path="/user/edit-post/:id" component={Auth(EditReview,true)} />
				<Route exact path="/books/:id" component={Auth(BooksView,null)} />
				<Route exact path="/user/user-reviews" component={Auth(UserPost,true)} />

			</Switch>
		</Layout>
	);
};

export default Routes;
