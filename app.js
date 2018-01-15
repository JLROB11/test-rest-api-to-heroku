const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// Set up mongoose connection
// Atlas project: test-rest-api-to-heroku, cluster: test-rest-api-to-heroku, username: admin, password: adminpw
const dev_db_url = 
'mongodb://admin:' 
+ process.env.MONGO_ATLAS_PW
+ '@test-rest-api-to-heroku-shard-00-00-wbwh9.mongodb.net:27017,test-rest-api-to-heroku-shard-00-01-wbwh9.mongodb.net:27017,test-rest-api-to-heroku-shard-00-02-wbwh9.mongodb.net:27017/test?ssl=true&replicaSet=test-rest-api-to-heroku-shard-0&authSource=admin'
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
