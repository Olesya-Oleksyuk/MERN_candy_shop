import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Выгрузить все товары
// @route GET /api/products?keyword
// @access Public
const getProducts = asyncHandler(async (req, res) => {

  // search keyword
  const keyword = req.query.keyword
    ? {
        name: {
          // we don't need exact match (part of a name is ok)
          $regex: req.query.keyword,
          // case insensitive
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({ ...keyword });
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
    await product.remove();
    res.json({ message: 'Продукт удалён' });
  } else {
    res.status(404);
    throw new Error('Товар не найден');
  }
});

// @desc Создать товар
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // product with sample data
  const product = new Product({
    name: 'Наименование',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Бренд',
    category: 'Категория',
    countInStock: 0,
    numReviews: 0,
    description: 'Описание',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Обновить товар
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Товар не найден');
  }
});

// @desc Добавить новый отзыв на товар
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    // check to see if the user has submitted the review for the product
    const alreadyReviewed = product.reviews.find(
      (rew) => rew.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Вы уже оставляли отзыв на этот товар');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Отзыв оставлен' });
  } else {
    res.status(404);
    throw new Error('Товар не найден');
  }
});

export {
  getProducts,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
