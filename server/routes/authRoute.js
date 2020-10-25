const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router()


//user authencaction for every route.....

router.get('/api/auth', auth, (req, res) => {
	res.json({
		isAuth: true,
		id: req.user._id,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname
	});
});

module.exports = router
