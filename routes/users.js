const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController.js');

// GET /users
// Get all users from DB
router.get('/', UsersController.users_get_all);

// POST /users
// Add a user to DB
router.post('/', UsersController.users_post_user);

module.exports = router;
