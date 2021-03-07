const express = require('express');
const mongoose = require('mongoose');
const productController = require('../controllers/productControllers');

const router = express.Router();
router.get('/', productController.getProducts);

module.exports = router;
