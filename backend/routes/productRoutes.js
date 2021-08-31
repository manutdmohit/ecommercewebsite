import express from 'express';
import asynchandler from 'express-async-handler';

const router = express.Router();

import Product from '../models/productModel.js';

// fetch all products // get // /api/products //public
router.get(
  '/',
  asynchandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// fetch a single product // get // /api/products/:id //public

router.get(
  '/:id',
  asynchandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
