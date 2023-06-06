var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require("http");
require("dotenv").config(); //configuration dotenv
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.URL_MONGO, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(
  ()=>{console.log('connect to BD');}
).catch(
  (error)=>{console.log(error.message);}
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server=http.createServer(app);
server.listen(5000,()=>{console.log("app is runnig on port 5000")});

module.exports = app;
