const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
const router = express.Router();

/*
 * @route     POST api/users/login
 * @desc      login
 * @access    public
 */
router.post('/login', usersController.login);

module.exports = router;
