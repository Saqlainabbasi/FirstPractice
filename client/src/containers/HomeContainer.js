import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../Store/actions';
import BookItem from '../widgetsUI/BookItem';

class HomeContainer extends Component {
	componentWillMount() {
		this.props.dispatch(getBooks(1, 0, 'desc'));
	}

	renderBooks = (books) => {
		return books.list ? books.list.map((book) => <BookItem {...book} key={book._id} />) : null;
	};

	loadmore = ()=>{
		const count = this.props.books.list.length;
		this.props.dispatch(getBooks(1,count,'desc',this.props.books.list))
	}

	render() {
		console.log(this.props);
		return <div>
			{this.renderBooks(this.props.books)}
			<div
			 className='loadmore'
			 onClick={this.loadmore}
			>Load More</div>
			</div>;
	}
}

function mapStateToProps(state) {
	return {
		books: state.books
	};
}

export default connect(mapStateToProps)(HomeContainer);
