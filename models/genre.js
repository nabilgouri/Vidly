const mongoose = require('mongoose');
const Joi = require('Joi');

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      upperCase: true,
      set(v) {
        return v.toUpperCase();
      },
      get(v) {
        return v.toUpperCase();
      },
    },
    tags: {
      type: Array,
      validator: {
        validate(v) {
          return v && v.length > 1;
        },
        message: 'At least one tag is required',
      },
    },
  })
);
function validateGenre(genre) {
  const genreSchema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    code: Joi.string().min(4).max(30).required(),
    tags: Joi.array().required(),
  });
  return genreSchema.validate(genre);
}
module.exports.Genre = Genre;
module.exports.validate = validateGenre;
