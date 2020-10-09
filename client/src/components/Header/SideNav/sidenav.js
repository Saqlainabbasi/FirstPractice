import React from 'react';
import SideNav from 'react-simple-sidenav';
import SidenavItem from './sidenav_item';

const sidenav = (props) => {
	return (
		<div>
			<SideNav
				showNav={props.showNav}
				onHideNav={props.onHideNav}
				navStyle={{
					background: '#242424',
					maxWidth: '220px'
				}}
			>
				<SidenavItem />
			</SideNav>
		</div>
	);
};

export default sidenav;
