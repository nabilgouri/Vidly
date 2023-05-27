const express = require('express');
const { Movie, validate } = require('../models/movie');

const router = express.Router();
router.get('/', async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await getMovie(id);
  if (!movie) return res.status(404).send('Movie not found');
  res.send(movie);
});

router.post('/', async (req, res) => {
  const { error } = await validate(req.body);
  if (error) {
    res.status(400).send(`${error}`);
    return;
  }
  const movie = await createMovie(req.body);
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await validate(req.body);
  if (error) {
    res.status(400).send(`${error}`);
    return;
  }
  const movie = await updateMovie(id, req.body);
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await deleteMovie(id, req.body);
  if (!movie) res.status(404).send('Movie not found');
  res.send(movie);
});
module.exports = router;

async function getMovies() {
  const movies = await Movie.find();
  return movies;
}

async function getMovie(id) {
  const movie = await Movie.findById(id);
  return movie;
}

async function createMovie(movieData) {
  let movie = new Movie(movieData);
  movie = await movie.save();
  return movie;
}

async function updateMovie(id, movieData) {
  let movie = await Movie.findById(id);
  Object.keys(movieData).forEach(it => {
    movie[it] = movieData?.[it];
  });
  movie = await movie.save();
  return movie;
}

async function deleteMovie(id) {
  const movie = await Movie.findByIdAndDelete(id);
  return movie;
}
