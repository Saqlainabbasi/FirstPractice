const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true
		},
		author: {
			type: String,
			default: 'n/a'
		},
		review: {
			type: String,
			default: 'n/a'
		},
		pages: {
			type: String,
			default: 'n/a'
		},
		rating: {
			type: Number,
			require: true,
			min: 1,
			max: 5
		},
		price: {
			type: String,
			default: 'n/a'
		},
		ownerId: {
			type: String,
			require: true
		}
	},
	{ timestamps: true }
);

//creating the model.....

const Book = mongoose.model('Book', bookSchema);

//exporting the model.....

module.exports = { Book };
