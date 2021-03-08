const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Express = require('express');
const User = require('../models/user.js');

const app = Express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.getSSN = ('/users:ssn', async function (request) {
  const getResult = await User.findOne(request);
  return getResult;
});

app.getFN = ('/users:firstName', async function (request) {
  const getResult = await User.find(request);
  return getResult;
});

app.getLN = ('/users:lastName', async function (request) {
  const getResult = await User.find(request);
  return getResult;
});

app.getAddress = ('/users:address', async function (request) {
  const getResult = await User.find(request);
  return getResult;
});

app.getPhone = ('/users:phoneNumber', async function (request) {
  const getResult = await User.find(request);
  return getResult;
});

app.postUsers = ('/users', async function (request) {
  const getResult = new User(request.body).save();
  return getResult;
});

app.deleteMultiple = ('/users', async function (request) {
  const getResult = await User.deleteMany(request);
  return getResult;
});

app.deleteSSN = ('/users:ssn', async function (request) {
  const getResult = await User.deleteOne(request);
  return getResult;
});

app.deleteFN = ('/users:firstName', async function (request) {
  const getResult = await User.deleteMany(request);
  return getResult;
});

app.deleteLN = ('/users:lastName', async function (request) {
  const getResult = await User.deleteMany(request);
  return getResult;
});

app.deleteAddress = ('/users:address', async function (request) {
  const getResult = await User.deleteMany(request);
  return getResult;
});

app.deletePhone = ('/users:phoneNumber', async function (request) {
  const getResult = await User.deleteMany(request);
  return getResult;
});

app.putUsers = ('/users:ssn', async function (request) {
  const getResult = await User.findOneAndUpdate(request);
  return getResult;
});

app.patchUsers = ('/users:ssn', async function (request) {
  const getResult = await User.findOneAndReplace(request);
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
