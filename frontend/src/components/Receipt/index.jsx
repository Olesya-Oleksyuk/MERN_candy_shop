import React from 'react';
import {
  Card, Col, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';

import PaypalButton from '../PaypalButton';
import { toCurrency } from '../../helpers/data';
import { CURRENCY, PAYMENT_METHOD } from '../../helpers/constants';

const Receipt = (
  {
    orderId = null,
    totalProductPrice,
    shippingPrice,
    totalPrice,
    currency = CURRENCY.DEFAULT,
    paymentMethod = PAYMENT_METHOD.PAYPAL,
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
