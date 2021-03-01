const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Product = require('../models/product');
const userService = require('../services/services');

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
