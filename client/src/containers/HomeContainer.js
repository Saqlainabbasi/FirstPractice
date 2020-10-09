import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../Store/actions';
import BookItem from '../widgetsUI/BookItem';

class HomeContainer extends Component {
	componentWillMount() {
		this.props.dispatch(getBooks(10, 0, 'desc'));
	}

	renderBooks = (books) => {
		return books.list ? books.list.map((book) => <BookItem {...book} key={book._id} />) : null;
	};

	render() {
		console.log(this.props);
		return <div>{this.renderBooks(this.props.books)}</div>;
	}
}

function mapStateToProps(state) {
	return {
		books: state.books
	};
}

export default connect(mapStateToProps)(HomeContainer);
