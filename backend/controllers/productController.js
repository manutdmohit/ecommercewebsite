import asynchandler from 'express-async-handler';
import Product from '../models/productModel.js';


// fetch all products // get // /api/products //public
const getProducts = asynchandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// fetch a single product // get // /api/products/:id //public
const getProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
