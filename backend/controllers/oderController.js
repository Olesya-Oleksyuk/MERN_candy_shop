import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Создать новый заказ
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    // Bad request
    res.status(400);
    throw new Error('Отсуствуют товары в заказе');
  } else {
    // инстанциируем
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice
    });

    // сохраняем в БД
    const createdOrder = await order.save();
    // smth was created
    res.status(201).json(createdOrder);
  }
})

export { addOrderItems }