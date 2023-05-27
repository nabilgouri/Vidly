const express = require('express');
const { Genre, validate } = require('../models/genre');

const router = express.Router();

// const genres = [
//   {
//     id: 1,
//     name: 'Action',
//   },
//   {
//     id: 2,
//     name: 'Romance',
//   },
//   {
//     id: 3,
//     name: 'Horror',
//   },
//   {
//     id: 4,
//     name: 'Drama',
//   },
//   {
//     id: 5,
//     name: 'Sci-fiction',
//   },
// ];

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const genre = await getGenre(id);
  if (!genre) return res.status(404).send(`Genre not found`);
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`${error}`);
  const genre = await updateGenre(id, req.body);
  // const genre = req.body;
  if (!genre) return res.status(404).send(`Genre not found`);
  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`${error}`);
  const genre = {
    ...req.body,
  };
  const result = await createGenre(genre);
  res.send(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const genre = await Genre.findByIdAndRemove(id);
  if (!genre) return res.status(404).send(`Genre not found`);
  res.send(genre);
});

module.exports = router;

async function createGenre(genreData) {
  const genre = new Genre(genreData);
  try {
    const result = await genre.save();
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function getGenres() {
  const genres = await Genre.find();
  return genres;
}

async function getGenre(id) {
  const genre = await Genre.findById(id);
  return genre;
}

async function updateGenre(id, genreData) {
  try {
    const genre = await Genre.findByIdAndUpdate(
      id,
      { ...genreData },
      {
        new: true,
      }
    );
    return genre;
  } catch (err) {
    console.log(err.message);
  }
}
