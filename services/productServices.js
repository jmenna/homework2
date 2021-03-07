const User = require('../models/product');

exports.get('/products', async (request, products) => {
  try {
    const products = await Product.find(request.query).select('-_id -__v');
    return products;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
});
