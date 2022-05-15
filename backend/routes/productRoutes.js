import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import APIfeatures from '../helper/queriesHandler.js';
import { isEmpty } from '../helper/helper.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);


    // // с фильтрацией
    // console.log('check', req.query);
    // if (isEmpty(req.query)) {
    //   console.log('здесб');
    //   const products = await Product.find({});
    //   res.json(products);
    // } else {
    //   console.log('тут');
    //   const features = new APIfeatures(Product.find(), req.query).filtering().sorting();
    //   const products = await features.query;
    //   res.json(products);
    // }
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
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
