const mongoose = require('mongoose');
const Joi = require('joi');
const { Genre, genreSchema } = require('./genre');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    genre: genreSchema,
    numberInstock: {
      type: Number,
      required: true,
    },
    dailyRentalRate: {
      type: Number,
    },
  })
);

function validateMovie(movieData) {
  const movieSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    genre: Joi.object(),
    numberInstock: Joi.number(),
    dailyRentalRate: Joi.number(),
  });

  return movieSchema.validate(movieData);
}

exports.Movie = Movie;
exports.validate = validateMovie;
