/* eslint-disable no-use-before-define */
const express = require('express');
const Joi = require('joi');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const genresRouter = require('./routes/genres');
const homeRouter = require('./routes/home');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/', homeRouter);

if (app.get('env') === 'development') {
  startupDebugger('Morgan enabled ....');
  app.use(morgan('tiny'));
}

const portNumber = process.env.PORT || 8000;

app.listen(portNumber, () => console.log(`Listening on port ${portNumber}`));
