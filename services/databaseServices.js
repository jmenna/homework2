const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Express = require('express');
const Product = require('../models/product.js');

const app = Express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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

exports.getAll('/products', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json();
  });
});

exports.GetOne('/products/:sku', async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const returnValue = await Product.findOne({ sku: request.params.sku }).select('-_id -__v');
    return returnValue;
  });
});

(async () => {
  await mongoose.connect('mongodb+srv://admin:U7CWgya36gFJg57@cluster0.vnnkb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
})();
