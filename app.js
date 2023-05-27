/* eslint-disable no-use-before-define */
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const genresRouter = require('./routes/genres');
const homeRouter = require('./routes/home');
const customersRouter = require('./routes/customers');
const moviesRouter = require('./routes/movies');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to DB ... '))
  .catch(err => console.error(`Couldn't connect to Mongo DB error =>`, err));

app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/', homeRouter);

if (app.get('env') === 'development') {
  startupDebugger('Morgan enabled ....');
  app.use(morgan('tiny'));
}

const portNumber = process.env.PORT || 8000;

app.listen(portNumber, () => console.log(`Listening on port ${portNumber}`));
