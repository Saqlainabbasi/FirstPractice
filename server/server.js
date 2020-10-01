const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

//mongoose configurations and connection setup..........
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

//using the middleware.......
app.use(bodyParser.json());
app.use(cookieParser());

//including the User Model........
const User = require('./model/user');

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log('Server Running ');
});
