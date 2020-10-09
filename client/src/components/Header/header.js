import React, { Component } from 'react';
import Fontawesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Sidenav from './SideNav/sidenav';

class Header extends Component {
	//state to toogle the side nav bar..............
	state = {
		showNav: false
	};

	onHideNav = () => {
		this.setState({ showNav: false });
	};

	render() {
		return (
			<header>
				<div className="open_nav">
					<Fontawesome
						name="bars"
						styles={{
							color: '#ffffff',
							padding: '10px',
							cursor: 'pointer'
						}}
						onClick={() => this.setState({ showNav: true })}
					/>
				</div>
				<Sidenav showNav={this.state.showNav} onHideNav={() => this.onHideNav()} />
				<Link to="/" className="logo">
					The Book Shelf
				</Link>
			</header>
		);
	}
}
export default Header;
