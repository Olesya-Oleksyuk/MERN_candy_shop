import React from 'react';
import {
  Card, Col, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';

import { toCurrency } from '../../helpers/data';
import PaypalButton from '../PaypalButton';

const Receipt = (
  {
    orderId = null,
    totalProductPrice,
    shippingPrice,
    totalPrice,
    currency = 'USD',
    paymentMethod = 'paypal',
    isPaid,
    children,
  },
) => {
  const totalProductPriceInCurrency = () => toCurrency(totalProductPrice, currency);
  const shippingPriceInCurrency = () => toCurrency(shippingPrice, currency);
  const totalPriceInCurrency = () => toCurrency(totalPrice, currency);

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroupItem>
          <h2>Чек</h2>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col>Товары</Col>
            <Col>
              {totalProductPriceInCurrency()}
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col>Доставка</Col>
            <Col>
              {shippingPriceInCurrency()}
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col>Итого</Col>
            <Col>
              {totalPriceInCurrency()}
            </Col>
          </Row>
        </ListGroupItem>
        { paymentMethod === 'paypal' && !!orderId && (
          <PaypalButton
            orderId={orderId}
            orderIsPaid={isPaid}
            orderPrice={totalPrice}
          />
        )}
        {children && (
          <ListGroupItem>
            {children}
          </ListGroupItem>
        )}
      </ListGroup>
    </Card>
  );
};

export default Receipt;
