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

// @desc Выгрузить заказ по ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {

  // const order = await Order.findById(req.params.id);

  // аналог join в SQL
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if(order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Заказ не найден')
  }
})

export { addOrderItems, getOrderById }