const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user-model');
require('dotenv/config');

/*
 * @route     POST api/users/login
 * @desc      login
 * @access    public
 */

const login = async (req, res, next) => {
	// extact data
	const { username, password } = req.body;

	// check if exist
	let existingUser;
	try {
		existingUser = await User.findOne({ username: username });
	} catch (err) {
		const error = new HttpError('Logging in failed, please try again.', 500);
		return next(error);
	}

	// check if user exist
	if (!existingUser) {
		const error = new HttpError('Invalid credentials, could not log you in.', 401);
		return next(error);
	}

	// check if password matched
	let isValidPassword = password === existingUser.password;

	// if wrong password
	if (!isValidPassword) {
		const error = new HttpError('Invalid credentials, could not log you in.', 500);
		return next(error);
	}

	// generate web token
	let token;
	try {
		token = jwt.sign({ userId: existingUser.id, username: existingUser.username }, process.env.TOKEN_SECRET_KEY);
	} catch (err) {
		const error = new HttpError('Logging in failed, please try again.', 500);
		return next(error);
	}

	// send it back to frontend
	res.json({ user: { ...existingUser.toObject({ getters: true }), password: null }, token: token });
};

exports.login = login;
