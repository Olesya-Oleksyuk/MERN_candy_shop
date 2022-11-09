import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Выгрузить все товары
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Выгрузить один товар
// @route GET /api/products/:id
// @access Public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Товар не найден');
  }
});

// @desc Удалить один товар
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove()
    res.json({message: 'Продукт удалён'})
  } else {
    res.status(404);
    throw new Error('Товар не найден');
  }
});

export { getProducts, getProductsById, deleteProduct };
