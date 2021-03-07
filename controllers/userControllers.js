const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Product = require('../models/product');
const userService = require('../services/userServices');

const app = Express();
app.use(BodyParser.json());

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
      || e.stack.includes('ValidationError')
      || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

app.get('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Product.find(request.query).select('-_id -__v'));
  });
});

async function createCord(req, res) {
  try {
    // We only pass the body object, never the req object
    const createdCord = await PostServiceInstance.create(req.body);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}
