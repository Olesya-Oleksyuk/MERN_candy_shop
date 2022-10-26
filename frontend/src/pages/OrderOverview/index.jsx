import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Receipt from '../../components/Receipt';
import OrderInfo from '../../components/OrderInfo';
import { CURRENCY } from '../../helpers/constants';

import { getOrderDetails } from '../../actions/orderAction';

import './style.scss';

const OrderOverviewPage = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const { order, loading, error } = useSelector((state) => state.orderDetails);

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
              <OrderInfo
                isOrderPlaced
                customerName={order.user.name}
                customerEmail={order.user.email}
                isDelivered={order.isDelivered}
                isPaid={order.isPaid}
                paidAt={order.paidAt}
                deliveredAt={order.deliveredAt}
                items={order.orderItems}
                shippingStreet={order.shippingAddress.address}
                shippingCity={order.shippingAddress.city}
                shippingPostalCode={order.shippingAddress.postalCode}
                shippingCountry={order.shippingAddress.country}
                paymentMethod={order.paymentMethod}
              />
            </Col>
            <Col md={4}>
              <Receipt
                orderId={orderId}
                isPaid={order.isPaid}
                totalProductPrice={order.itemsPrice}
                shippingPrice={order.shippingPrice}
                totalPrice={order.totalPrice}
                currency={CURRENCY.DEFAULT}
                paymentMethod={order.paymentMethod}
              />
            </Col>
          </Row>
        </>
      );
    }
    return <></>;
  };

  return <>{getContent()}</>;
};

export default OrderOverviewPage;
