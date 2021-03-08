const Product = require('../models/product.js');

exports.get = async function (query, page, limit) {
  try {
    const products = await Product.find(query);
    return products;
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
