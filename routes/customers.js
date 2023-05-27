const express = require('express');
const { Customer, validate } = require('../models/customer');

const router = express.Router();
router.get('/', async (req, res) => {
  const customers = await getCustomers();
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const customer = await getCustomer(id);
  if (!customer) return res.status(404).send('Customer not found');
  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = await validate(req.body);
  if (error) {
    res.status(400).send(`${error}`);
    return;
  }
  const customer = await createCustomer(req.body);
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await validate(req.body);
  if (error) {
    res.status(400).send(`${error}`);
    return;
  }
  const customer = await updateCustomer(id, req.body);
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const customer = await deleteCustomer(id, req.body);
  if (!customer) res.status(404).send('Customer not found');
  res.send(customer);
});
module.exports = router;

async function getCustomers() {
  const customers = await Customer.find();
  return customers;
}

async function getCustomer(id) {
  const customer = await Customer.findById(id);
  return customer;
}

async function createCustomer(customerData) {
  let customer = new Customer(customerData);
  customer = await customer.save();
  return customer;
}

async function updateCustomer(id, customerData) {
  const customer = await Customer.findByIdAndUpdate(
    id,
    { ...customerData },
    {
      new: true,
    }
  );
  return customer;
}

async function deleteCustomer(id) {
  const customer = await Customer.findByIdAndDelete(id);
  return customer;
}
