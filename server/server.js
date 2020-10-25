const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();


//mongoose database configurations and connection setup..........
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });


//using the middleware.......
app.use(bodyParser.json());
app.use(cookieParser());

//importing the routes..............

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authRoute = require('./routes/authRoute');

//making the Routes.........



//
// Book routes using express Router...
//
app.use(bookRoutes);

//
// user routes using express Router...
//
app.use(userRoutes);

//
// user routes using express Router...
//
app.use(authRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log('Server Running ');
});
