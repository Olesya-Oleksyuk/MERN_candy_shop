import express from 'express';
import {
  deleteProduct,
  getProducts,
  getProductsById,
} from '../controllers/productController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
import APIfeatures from '../helper/queriesHandler.js';
import { isEmpty } from '../helper/helper.js';

const router = express.Router();

router.route('/').get(getProducts);

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

router
  .route('/:id')
  .get(getProductsById)
  .delete(protect, isAdmin, deleteProduct);

export default router;
