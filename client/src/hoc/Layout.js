import React from 'react';
import Header from '../components/Header/header';
//using children props form the routesJS
const Layout = (props) => {
	return (
		<div>
			<Header />
			<div>{props.children}</div>      
		</div>
	);
};

export default Layout;
