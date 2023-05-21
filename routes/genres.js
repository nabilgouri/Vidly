const express = require('express');
const Joi = require('joi');

const router = express.Router();

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

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const genre = genres.find(it => it.id === parseInt(id));
  if (!genre) return res.status(404).send(`Genre not found`);

  res.send(genre);
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const genre = genres.find(it => it.id === parseInt(id));
  if (!genre) return res.status(404).send(`Genre not found`);
  const genreIndex = genres.findIndex(it => it.id === parseInt(id));
  genres.splice(genreIndex, 1);

  res.send(genres);
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(`${error}`);
  const genre = {
    id: genres.length + 1,
    ...req.body,
  };
  genres.push(genre);
  res.send(genre);
});

function validateGenre(genre) {
  const genreSchema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
  });
  return genreSchema.validate(genre);
}

module.exports = router;
