import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useHistory } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { listOrders } from '../../actions/orderAction';
import { toCurrency, toDateTime } from '../../helpers/data';
import { CURRENCY, DATE_TIME_FORMAT } from '../../helpers/constants';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const getTableUserList = () => {
    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;
    if (orders) {
      return (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>ИМЯ</th>
              <th>ДАТА</th>
              <th>СУММА</th>
              <th style={{ textAlign: 'center' }}>ОПЛАЧЕНО</th>
              <th style={{ textAlign: 'center' }}>ДОСТАВЛЕНО</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{ toDateTime(order.createdAt, DATE_TIME_FORMAT.SHORT)}</td>
                <td>{toCurrency(order.totalPrice, CURRENCY.DEFAULT)}</td>
                <td style={{ textAlign: 'center' }}>
                  {order.isPaid
                    ? (toDateTime(order.paidAt, DATE_TIME_FORMAT.SHORT))
                    : (<i className="fas fa-times" style={{ color: 'red' }} />)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {order.isDelivered
                    ? (toDateTime(order.deliveredAt, DATE_TIME_FORMAT.SHORT))
                    : (<i className="fas fa-times" style={{ color: 'red' }} />)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant="link" size="sm">
                      Детали
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return <></>;
  };

  return (
    <>
      <h1>Заказы</h1>
      {getTableUserList()}
    </>
  );
};

export default OrderListScreen;
