import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Card,
  Col, Image, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps';
import Message from '../../components/Message';
import { addDecimals } from '../../helpers/data';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const shipping = useSelector((state) => state.shipping);
  const payment = useSelector((state) => state.payment);

  // Расчёт цен
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  shipping.shippingPrice = addDecimals(cart.itemsPrice > 200 ? 0 : 100);
  cart.totalPrice = addDecimals((Number(cart.itemsPrice) + Number(shipping.shippingPrice)).toFixed(2));

  const placeOrderHandler = () => {
    console.log('');
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Доставка</h2>
              <p>
                <strong className="me-2">Адрес:</strong>
                {shipping.shippingAddress.address}
                ,
                {'  '}
                {shipping.shippingAddress.city}
                ,
                {'  '}
                {shipping.shippingAddress.postalCode}
                ,
                {'  '}
                {shipping.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Способ оплаты</h2>
              <strong className="me-2">
                Метод:
              </strong>
              {payment.paymentMethod?.paymentMethod?.toUpperCase()}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Заказываемые товары</h2>
              {cart.cartItems.length === 0 ? <Message>Ваша товарная корзина пуста</Message> : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity}
                          {' '}
                          x $
                          {item.price}
                          {' '}
                          = $
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Чек</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Товары</Col>
                  <Col>
                    $
                    {cart.itemsPrice}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Доставка</Col>
                  <Col>
                    $
                    {shipping.shippingPrice}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Итого</Col>
                  <Col>
                    $
                    {cart.totalPrice}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  style={{ width: '100%' }}
                  type="button"
                  size="lg"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Завершить заказ
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
