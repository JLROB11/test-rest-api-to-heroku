const mongoose = require('mongoose');
const User = require('../models/user.js');

//GET /users
// Get all users from DB
exports.users_get_all = function(req, res, next) {
  User.find({}, {username:1})
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    next(err);
  });
};

// POST /users
// Add a user to DB
exports.users_post_user = function(req, res, next) {
  User.create(req.body)
  .then(user => {
    res.status(200).json({
      message: "Created user successfully",
      user: {
        _id: user._id,
        username: user.username
      }
    });
  })
  .catch(err => {
    next(err);
  });
};