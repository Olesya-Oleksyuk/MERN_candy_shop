import React from 'react';
import {
  Col, Image, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Message from '../Message';
import { paymentMethodName, toCurrency, toDateTime } from '../../helpers/data';
import { CURRENCY, DATE_TIME_FORMAT } from '../../helpers/constants';

const OrderInfo = (
  {
    isOrderPlaced = false,
    customerName = '',
    customerEmail = '',
    isDelivered = false,
    isPaid = false,
    paidAt = null,
    deliveredAt = null,
    items,
    shippingStreet,
    shippingCity,
    shippingPostalCode,
    shippingCountry,
    paymentMethod,
  },
) => {
  const shippingAddress = () => `${shippingStreet}, ${shippingCity}, ${shippingPostalCode}, ${shippingCountry}`;

  const overallProductCost = (cost, amount) => `${amount} X ${toCurrency(cost, CURRENCY.DEFAULT)} = ${toCurrency(
    (cost * amount).toFixed(2), CURRENCY.DEFAULT,
  )}`;

  return (
    <ListGroup variant="flush">
      <ListGroupItem>
        <h2>Доставка</h2>
        {isOrderPlaced && (
          <>
            <p>
              <strong>Имя:</strong>
              &nbsp;
              {customerName}
            </p>
            <p>
              <strong>Почта:</strong>
              <a href={`mailto:${customerEmail}`}>
                &nbsp;
                {customerEmail}
              </a>
            </p>
          </>
        )}
        <p>
          <strong>Адрес:</strong>
          &nbsp;
          {shippingAddress()}
        </p>
        { !isOrderPlaced ? null : isDelivered ? (
          <Message variant="success">
            Доставлено:&nbsp;
            {toDateTime(deliveredAt, DATE_TIME_FORMAT.DEFAULT)}
          </Message>
        ) : (
          <Message variant="danger">Не доставлено</Message>
        )}
      </ListGroupItem>
      <ListGroupItem>
        <h2>Способ оплаты</h2>
        <p>
          <strong className="me-2">
            Метод:
          </strong>
          {paymentMethodName(paymentMethod)}
        </p>
        {!isOrderPlaced ? null : isPaid ? (
          <Message variant="success">
            Оплачено:&nbsp;
            {toDateTime(paidAt, DATE_TIME_FORMAT.DEFAULT)}
          </Message>
        ) : (
          <Message variant="danger">Не оплачено</Message>
        )}
      </ListGroupItem>
      <ListGroupItem>
        <h2>Заказываемые товары</h2>
        {items.length === 0 ? <Message>Ваша товарная корзина пуста</Message> : (
          <ListGroup variant="flush">
            {items.map((item, index) => (
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
                    {overallProductCost(item.price, item.quantity)}
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </ListGroupItem>
    </ListGroup>
  );
};

export default OrderInfo;
