const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Express = require('express');
const Product = require('../models/product.js');
const User = require('../models/user.js');

const app = Express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.getSKU = ('/products:sku', async function (request) {
  const getResult = await Product.findOne(request);
  return getResult;
});

app.getName = ('/products:name', async function (request) {
  const getResult = await Product.find(request);
  return getResult;
});

app.getQuantity = ('/products:quantity', async function (request) {
  const getResult = await Product.find(request);
  return getResult;
});

app.getPrice = ('/products:price', async function (request) {
  const getResult = await Product.find(request);
  return getResult;
});

app.postProducts = ('/products', async function (request) {
  const getResult = new Product(request.body).save();
  return getResult;
});

app.deleteMultiple = ('/products', async function (request) {
  const getResult = await Product.deleteMany(request);
  return getResult;
});

app.deleteSKU = ('/products:sku', async function (request) {
  const getResult = await Product.deleteOne(request);
  return getResult;
});

app.deleteName = ('/products:name', async function (request) {
  const getResult = await Product.deleteMany(request);
  return getResult;
});

app.deleteQuantity = ('/products:quantity', async function (request) {
  const getResult = await Product.deleteMany(request);
  return getResult;
});

app.deletePrice = ('/products:price', async function (request) {
  const getResult = await Product.deleteMany(request);
  return getResult;
});

app.putProduct = ('/products:sku', async function (request) {
  const getResult = await Product.findOneAndUpdate(request);
  return getResult;
});

app.patchProducts = ('/products:sku', async function (request) {
  const getResult = await Product.findOneAndReplace(request);
  return getResult;
});

(async () => {
  await mongoose.connect('mongodb+srv://admin:U7CWgya36gFJg57@cluster0.vnnkb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
})();
