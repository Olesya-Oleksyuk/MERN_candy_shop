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
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    // Bad request
    res.status(400);
    throw new Error('Отсуствуют товары в заказе');
  } else {
    // инстанциируем
    const order = new Order({
      orderItems,
      // из мидлвара аутентификации
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // сохраняем в БД
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Выгрузить заказ по ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  // аналог join в SQL
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order && (req.user.isAdmin || req.user._id.equals(order.user._id))) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Заказ не найден');
  }
});

// @desc Обновить статус оплаты заказа на оплачено
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Заказ не найден');
  }
});

// @desc Выгрузить ВСЕ заказы пользователя
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
