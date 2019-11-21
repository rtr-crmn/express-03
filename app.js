import bookingsRouter from './routes/bookings';
import usersRouter from './routes/users';

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { check, validationResult } from 'express-validator';

import hbs from 'hbs';

const app = express();
const router = express.Router();

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', bookingsRouter);

app.post('/test-a', [
  check('username').isEmail(),
  check('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  console.log(errors.array());

  return errors.isEmpty() ? res.status(200).json({ }) : res.status(422).json({ errors: errors.array() });
});

router.post('/test-b', [
  check('username').isEmail(),
  check('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  console.log(errors.array());

  return errors.isEmpty() ? res.status(200).json({ }) : res.status(422).json({ errors: errors.array() });
});

app.use('/bookings', bookingsRouter);

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
