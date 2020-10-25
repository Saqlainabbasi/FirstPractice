const express = require('express');

const { Book } = require('../model/book');

const router = express.Router()



//.......GET requests----------

// to get one book using _id ..............

router.get('/api/getBook', (req, res) => {
	const id = req.query.id;

	Book.findById(id, (err, doc) => {
		if (err) return res.status(400).json(err);
		res.send(doc);
	});
});

// to get more then one book..............

router.get('/api/getBooks', (req, res) => {
	const skip = parseInt(req.query.skip);
	const limit = parseInt(req.query.limit);
	const order = req.query.order;

	Book.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
		if (err) return res.status(400).send(err);
		res.send(doc);
	});
});

//get user or reviewer posts on Books.....
// here in these {} we specify the data through which we want to find the data......
router.get('/api/user_posts', (req, res) => {
	Book.find({ ownerId: req.query.user }).exec((err, docs) => {
		if (err) return res.status(400).send(err);
		res.send(docs);
	});
});

//....POST....

router.post('/api/book', (req, res) => {
	//creating the refrence to the book model.....
	const book = new Book(req.body);
	book.save((err, doc) => {
		if (err) return res.status(400).send(err);
		res.status(200).json({
			post: true,
			bookId: doc._id
		});
	});
});

//.......Update----------

router.post('/api/book_update', (req, res) => {
	Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
		if (err) return res.status(400).send(err);
		res.json({
			success: true,
			doc
		});
	});
});

//.......Delete----------

router.delete('/api/delete_book', (req, res) => {
	const id = req.body._id;

	Book.findByIdAndRemove(id, (err, doc) => {
		if (err) return res.status(400).send(err);
		res.json({
			message: 'Data deleted'
		});
	});
});


module.exports = router