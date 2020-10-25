const express = require('express');

const { User } = require('../model/user');
const { auth } = require('../middleware/auth');

const router = express.Router()

router.get('/api/getReviewer', (req, res) => {
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
//** .find({},cb) */ this method is use to get all the data of the model specified
router.get('/api/users', (req, res) => {
	User.find({}, (err, user) => {
		if (err) return res.status(400).send(err);
		res.status(200).send(user);
	});
});



//user logout.........

router.get('/api/logout', auth, (req, res) => {
	// console.log(req);
	// res.send(req.user);
	req.user.deleteToken(req.token, (err, user) => {
		if (err) return res.status(400).send(err);
		res.sendStatus(200);
	});
});

//........POST.......

//user register......................

router.post('/api/register', (req, res) => {
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

router.post('/api/login', (req, res) => {
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







module.exports = router;