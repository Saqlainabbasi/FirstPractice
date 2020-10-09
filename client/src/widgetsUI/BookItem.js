import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = (item) => {
	return (
		<Link to={`/getBook/${item._id}`} className="book_item">
			<div className="books_header">
				<h2>{item.name}</h2>
			</div>
			<div className="book_items">
				<div className="book_author">{item.author}</div>
				<div className="book_bubble">
					<strong>Price</strong> $ {item.price}
				</div>
				<div className="book_bubble">
					<strong>Pages</strong>
					{item.pages}
				</div>
				<div className="book_bubble">
					<strong>Rating</strong>
					{item.rating}
				</div>
			</div>
		</Link>
	);
};

export default BookItem;
