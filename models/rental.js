const mongoose = require('mongoose');
const Joi = require('joi');
const { Genre, genreSchema } = require('./genre');

const rental = mongoose.model(
  'Rental',
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          minlength: 3,
          maxlength: 255,
          required: true,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 10,
          maxlength: 12,
        },
      }),
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 255,
        },
      }),
    },
  })
);

function validateRental(rentalData) {
  const rentalSchema = Joi.object({
    customer: Joi.object().required(),
    movie: Joi.object().required(),
  });

  return rentalSchema.validate(rentalData);
}

exports.rental = rental;
exports.validate = validateRental;
