import asynchandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// create new order // post // /api/orders //private
const addOrderItems = asynchandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// create get order // get // /api/orders/id //private
const getOrderById = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//update order to paid // get // /api/orders/id/pay //private
const updateOrderToPaid = asynchandler(async (req, res) => {
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
    throw new Error('Order not found');
  }
});

// update order to delivered // get // /api/orders/id/deliver //private/admin
const updateOrderToDelivered = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isDelivered = true), (order.deliveredAt = Date.now());

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//get logged in user ord ers // get // /api/orders/myorders //private
const getMyOrders = asynchandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

//get all orders // get // /api/orders // private/admin
const getOrders = asynchandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
