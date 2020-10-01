const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

//mongoose configurations and connection setup..........
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

//including the User Model........
const { User } = require('./model/user');
const { Book } = require('./model/book');

//using the middleware.......
app.use(bodyParser.json());
app.use(cookieParser());

//making the Routes.........

//.......GET----------

app.get('/api/getBook', (req, res) => {
	const id = req.query.id;

	Book.findById(id, (err, doc) => {
		if (err) return res.status(400).send(err);
		res.send(doc);
	});
});

// to get more them one book..............

app.get('/api/getBooks', (req, res) => {
	const skip = parseInt(req.query.skip);
	const limit = parseInt(req.query.limit);
	const order = req.query.order;

	Book.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
		if (err) return res.status(400).send(err);
		res.send(doc);
	});
});

//.......Post----------

app.post('/api/book', (req, res) => {
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
//.......Delete----------

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log('Server Running ');
});
