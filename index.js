const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv/config');

const itemsRoutes = require('./routes/items-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

// body parser middleware
app.use(express.json());

// use cors middleware
app.use(cors());

// initiates routes
app.use('/api/items', itemsRoutes);
app.use('/api/users', usersRoutes);

// handling our thrown errors --> special middleware
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});

// this step for real deployment
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
	});
}

// launch our server and connect to database
const PORT = process.env.PORT || 5000;
//const mongodb_url = process.env.MONGODB_URL;
const mongodb_url = mongodb://127.0.0.1/inventory;
mongoose
	.connect(mongodb_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Database connected'))
	.then(() => {
		app.listen(PORT, () => console.log('Server is running on port ' + PORT));
	})
	.catch((err) => {
		console.log(err);
	});
	
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log('Server is running on port ' + PORT));
//app.listen(PORT, () => console.log('Server is running'));
