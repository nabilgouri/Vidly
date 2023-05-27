const mongoose = require('mongoose');
const Joi = require('Joi');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    isGold: Boolean,
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  })
);
function validateCustomer(customer) {
  const customerSchema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().required(),
  });
  return customerSchema.validate(customer);
}
exports.Customer = Customer;
exports.validate = validateCustomer;
