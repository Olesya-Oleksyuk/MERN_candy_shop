import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loader';
import Message from '../Message';
import useAdaptiveCell from '../../helpers/AdaptiveTable';

import { toCurrency, toDateTime } from '../../helpers/data';
import { CURRENCY, DATE_TIME_FORMAT } from '../../helpers/constants';

import { listCustomerOrder } from '../../actions/orderAction';

const OrdersTable = () => {
  const dispatch = useDispatch();

  const orderListCustomer = useSelector((state) => state.orderListCustomer);
  const { loading, error, orders } = orderListCustomer;

  const { onClickCellHandler, adaptiveCell } = useAdaptiveCell();

  useEffect(() => {
    dispatch(listCustomerOrder());
  }, []);

  const getOrdersContent = () => {
    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;
    if (!orders.length) return <Message variant="secondary">Заказов нет!</Message>;
    return (
      <Table striped bordered hover responsive size="sm" style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ДАТА</th>
            <th>ИТОГО</th>
            <th>ОПЛАЧЕНО</th>
            <th>ДОСТАВЛЕНО</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td
                className={adaptiveCell(order._id)}
                onClick={(e) => onClickCellHandler(e, order._id)}
              >
                {order._id}
              </td>
              <td>
                {' '}
                {toDateTime(order.createdAt, DATE_TIME_FORMAT.SHORT)}
              </td>
              <td>{toCurrency(order.totalPrice, CURRENCY.USD)}</td>
              <td>
                {order.isPaid ? toDateTime(order.paidAt, DATE_TIME_FORMAT.SHORT)
                  : <i className="fas fa-times" style={{ color: 'red' }} /> }
              </td>
              <td>
                {order.isDelivered ? toDateTime(order.deliveredAt, DATE_TIME_FORMAT.SHORT)
                  : <i className="fas fa-times" style={{ color: 'red' }} /> }
              </td>
              <td>
                <LinkContainer to={`orders/${order._id}`}>
                  <Button className="btn-sm" variant="light">Детали</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      {getOrdersContent()}
    </>
  );
};

export default OrdersTable;
