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
const { auth } = require('./middleware/auth');

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

// user...

app.get('/api/getReviewer', (req, res) => {
	const id = req.query.id;

	User.findById(id, (err, doc) => {
		if (err) return res.status(400).send(err);
		res.json({
			name: doc.name,
			lastname: doc.lastname
		});
	});
});

//get all users....

app.get('/api/users', (req, res) => {
	User.find({}, (err, user) => {
		if (err) return res.status(400).send(err);
		res.status(200).send(user);
	});
});

//get user or reviewer posts on Books.....

app.get('/api/user_posts', (req, res) => {
	Book.find({ ownerId: req.query.user }).exec((err, docs) => {
		if (err) return res.status(400).send(err);
		res.send(docs);
	});
});

//user logout.........

app.get('/api/logout', auth, (req, res) => {
	res.send(req.user);
	req.user.deleteToken(req.token, (err, user) => {
		if (err) return res.status(400).send(err);
		res.sendStatus(200);
	});
});

//.......**************Post************----------///

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

//user register......................

app.post('/api/register', (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) return res.status(400).send(err);
		res.json({
			success: true,
			user: doc
		});
	});
});

// user Login..........

app.post('/api/login', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) return res.json({ isAuth: false, message: 'email not found' });

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({
					isAuth: false,
					message: 'Wrong Password'
				});
			}
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				//sending response to the browser and storing the cookie.......
				res.cookie('auth', user.token).json({
					isAuth: true,
					id: user._id,
					email: user.email
				});
			});
		});
	});
});

//.......Update----------

app.post('/api/book_update', (req, res) => {
	Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
		if (err) return res.status(400).send(err);
		res.json({
			success: true,
			doc
		});
	});
});

//.......Delete----------

app.delete('/api/delete_book', (req, res) => {
	const id = req.body._id;

	Book.findByIdAndRemove(id, (err, doc) => {
		if (err) return res.status(400).send(err);
		res.json({
			message: 'Data deleted'
		});
	});
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log('Server Running ');
});
