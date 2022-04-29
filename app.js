var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var Client = require('./src/entities/Client');
var clientList = require('./src/list/ClientList');

clientList.add(new Client('LunarLoger', 'b09dfe5d-71ee-4d9a-bf12-4df371aafa5c'));
clientList.add(new Client('Webserver', '718f30c2-fab9-4fc4-8df0-615e60dc3cf7'));
clientList.add(new Client('Nodemailer', 'ffb6bdff-30fc-4249-b4ef-15413712427a'));
clientList.add(new Client('LiveFeed', 'b2d8a3b1-695f-4f45-a2ac-c02c659f0104'));

var subscriberLoop = require('./src/loops/SubscriberLoop');
subscriberLoop.startLoop();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
