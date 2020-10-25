const express = require('express');

// const { User } = require('../model/user');
const { auth } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router()

router.get('/api/getReviewer', userController.user_reviews);

//get all users....
 router.get('/api/users', userController.user_index);

//user logout.........

router.get('/api/logout', auth, userController.user_logout);

//........POST.......

//user registration......................

router.post('/api/register', userController.user_register);

// user Login..........

router.post('/api/login', userController.user_login);







module.exports = router;