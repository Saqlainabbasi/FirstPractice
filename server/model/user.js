const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

//creating user Schema..........

const userSchema = mongoose.Schema({
	email: {
		type: String,
		require: true,
		trim: true,
		unique: 1
	},
	password: {
		type: String,
		require: true,
		minLength: 6
	},
	name: {
		type: String,
		maxLength: 100
	},
	lastname: {
		type: String,
		maxLength: 100
	},
	role: {
		type: Number,
		default: 0
	},
	token: {
		type: String
	}
});

//now creating the model....

const User = mongoose.model('User', userSchema);

//exporting the model.....

module.exports = { User };
