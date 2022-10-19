import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import UsePaypalButton from '../../components/UsePaypalButton';

import { getOrderDetails } from '../../actions/orderAction';

import { capitalize, toCurrency } from '../../helpers/data';

import './style.scss';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const overallProductCost = (cost, amount) => `${amount} X ${toCurrency(cost, 'USD')} = ${toCurrency((cost * amount)
    .toFixed(2), 'USD')}`;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, []);

  const getContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <Message variant="danger">{error}</Message>;
    }
    if (order) {
      return (
        <>
          <h1 className="d-flex flex-wrap flex-md-fill align-items-end">
            <span> Номер заказа:</span>
            <span className="ms-3 orderId">{order._id}</span>
          </h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>Доставка</h2>
                  <p>
                    <strong>Имя:</strong>
                    &nbsp;
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Почта:</strong>
                      &nbsp;
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Адрес:</strong>
                    &nbsp;
                    <span className="pe-2">
                      {order.shippingAddress.address}
                      ,
                    </span>
                    <span className="pe-2">
                      {order.shippingAddress.city}
                      ,
                    </span>
                    <span className="pe-2">
                      {order.shippingAddress.postalCode}
                      ,
                    </span>
                    <span className="pe-2">
                      {order.shippingAddress.country}
                    </span>
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Доставлено
                      {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Не доставлено</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Способ оплаты</h2>
                  <p>
                    <strong>Метод:</strong>
                    &nbsp;
                    {order.paymentMethod && order.paymentMethod === 'paypal'
                      ? 'PayPal'
                      : capitalize(payment.paymentMethod)}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">
                      Оплачено:&nbsp;
                      {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Не оплачено</Message>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Заказываемые товары</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Ваш заказ пустой</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {overallProductCost(item.price, item.quantity)}
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
                        {toCurrency(order.itemsPrice, 'USD')}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Доставка</Col>
                      <Col>
                        {toCurrency(order.shippingPrice, 'USD')}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Итого</Col>
                      <Col>
                        {toCurrency(order.totalPrice, 'USD')}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <UsePaypalButton
                    order={order}
                    orderId={orderId}
                    orderIsPaid={order.isPaid}
                    orderPrice={order.totalPrice}
                  />
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
    return <></>;
  };

  return <>{getContent()}</>;
};

export default OrderScreen;
