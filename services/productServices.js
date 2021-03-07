const { Mongoose } = require('mongoose');
const Product = require('../models/product');

class ProductService {
  /**
     * @description Create an instance of PostService
     */
  constructor() {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new Mongoose(Product);
  }

  /**
     * @description Attempt to create a post with the provided object
     * @param postToCreate {object} Object containing all required fields to
     * create post
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
  async get(postToGet) {
    try {
      const result = await this.MongooseServiceInstance.get(postToGet);
      return { success: true, body: result };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = ProductService;
