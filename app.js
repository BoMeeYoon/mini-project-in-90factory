const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const bodyParser = require('body-parser');




// 관리자 router
const adminRouter = require('./server/routes/admin');
const addmemberRouter = require('./server/routes/addmember')
const readmemberRouter = require('./server/routes/readmember')
const editmemberRouter = require('./server/routes/editmember')
const deletememberRouter = require('./server/routes/deletemember')

// 입/출차 router
const usersRouter = require('./server/routes/users');
const carInRouter = require('./server/routes/carIn');
const carOutRouter = require('./server/routes/carOut');
const carOut_payRouter = require('./server/routes/carOut_pay');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', adminRouter);
app.use('/addmember', addmemberRouter);
app.use('/readmember', readmemberRouter);
app.use('/editmember', editmemberRouter);
app.use('/deletemember', deletememberRouter);

app.use('/users', usersRouter);
app.use('/carIn', carInRouter);
app.use('/carOut', carOutRouter);
app.use('/carOut/pay', carOut_payRouter);


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

module.exports = app;
