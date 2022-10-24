import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import CheckoutSteps from '../../components/CheckoutSteps';
import Message from '../../components/Message';
import Receipt from '../../components/Receipt';
import OrderInfo from '../../components/OrderInfo';

import { addDecimals } from '../../helpers/data';
import { createOrder } from '../../actions/orderAction';
import { clearCart } from '../../actions/cartAction';
import { ORDER_CREATE_FINISH } from '../../constants/orderConstants';

const OrderInCheckoutScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const shipping = useSelector((state) => state.shipping);
  const payment = useSelector((state) => state.payment);

  // Расчёт цен
  cart.itemsPrice = addDecimals(cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0));
  shipping.shippingPrice = addDecimals(cart.itemsPrice > 50 ? 0 : 4.8);
  cart.totalPrice = addDecimals((Number(cart.itemsPrice) + Number(shipping.shippingPrice))
    .toFixed(2));

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      dispatch({ type: ORDER_CREATE_FINISH });
      history.push(`/orders/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: shipping.shippingAddress,
      paymentMethod: payment.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: shipping.shippingPrice,
      totalPrice: cart.totalPrice,
    }));
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <OrderInfo
            items={cart.cartItems}
            shippingStreet={shipping.shippingAddress.address}
            shippingCity={shipping.shippingAddress.city}
            shippingPostalCode={shipping.shippingAddress.postalCode}
            shippingCountry={shipping.shippingAddress.country}
            paymentMethod={payment.paymentMethod}
          />
        </Col>
        <Col md={4}>
          <Receipt
            isPaid={false}
            totalProductPrice={cart.itemsPrice}
            shippingPrice={shipping.shippingPrice}
            totalPrice={cart.totalPrice}
            currency="USD"
            paymentMethod={payment.paymentMethod}
          >
            {error ? <Message variant="danger">{error}</Message> : (
              <Button
                style={{ width: '100%' }}
                type="button"
                size="lg"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Завершить заказ
              </Button>
            )}
          </Receipt>
        </Col>
      </Row>
    </>
  );
};

export default OrderInCheckoutScreen;
