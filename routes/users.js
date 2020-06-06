const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// Register for a new user
router.post('/register/', userController.registerUser);

// Login for an existing user
router.post('/login/', userController.loginUser);


module.exports = router;
