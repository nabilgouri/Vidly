/* eslint-disable no-use-before-define */
const express = require('express');
const Joi = require('joi');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());

if (app.get('env') === 'development') {
  startupDebugger('Morgan enabled ....');
  app.use(morgan('tiny'));
}

const portNumber = process.env.PORT || 8000;
const genres = [
  {
    id: 1,
    name: 'Action',
  },
  {
    id: 2,
    name: 'Romance',
  },
  {
    id: 3,
    name: 'Horror',
  },
  {
    id: 4,
    name: 'Drama',
  },
  {
    id: 5,
    name: 'Sci-fiction',
  },
];

app.get('/', (req, res) => {
  res.render('index', { title: 'Vidly', message: 'Hello' });
});
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const { id } = req.params;
  const genre = genres.find(it => it.id === parseInt(id));
  if (!genre) return res.status(404).send(`Genre not found`);

  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const { id } = req.params;
  const genre = genres.find(it => it.id === parseInt(id));
  if (!genre) return res.status(404).send(`Genre not found`);
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`${error}`);
  Object.keys(req.body).forEach(it => {
    genre[it] = req.body[it];
  });

  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const { id } = req.params;
  const genre = genres.find(it => it.id === parseInt(id));
  if (!genre) return res.status(404).send(`Genre not found`);
  const genreIndex = genres.findIndex(it => it.id === parseInt(id));
  genres.splice(genreIndex, 1);

  res.send(genres);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`${error}`);
  const genre = {
    id: genres.length + 1,
    ...req.body,
  };
  genres.push(genre);
  res.send(genre);
});
app.listen(portNumber, () => console.log(`Listening on port ${portNumber}`));

function validateGenre(genre) {
  const genreSchema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
  });
  return genreSchema.validate(genre);
}
