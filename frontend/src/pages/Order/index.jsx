import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Col, Image, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getOrderDetails } from '../../actions/orderAction';

import './style.scss';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const getContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <Message />;
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
                    <strong>
                      Имя:
                      <span className="ms-2">{order.user.name}</span>
                    </strong>
                    <p />
                    <p>
                      <strong>
                        Почта:
                      </strong>
                      <a href={`mailto:${order.user.email}`} className="ms-2">{order.user.email}</a>
                    </p>
                    <strong className="me-2">Адрес:</strong>
                    {order.shippingAddress.address}
                    ,
                    {'  '}
                    {order.shippingAddress.city}
                    ,
                    {'  '}
                    {order.shippingAddress.postalCode}
                    ,
                    {'  '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Доставлено
                      {order.paidAt}
                    </Message>
                  ) : (<Message variant="danger">Не доставлено</Message>)}
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Способ оплаты</h2>
                  <p>
                    <strong className="me-2">
                      Метод:
                    </strong>
                    {order.paymentMethod?.toUpperCase()}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">
                      Оплачено
                      {order.paidAt}
                    </Message>
                  ) : (<Message variant="danger">Не оплачено</Message>)}
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Заказываемые товары</h2>
                  {order.orderItems.length === 0 ? <Message>Ваш заказ пустой</Message> : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
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
                        {order.itemsPrice}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Доставка</Col>
                      <Col>
                        $
                        {order.shippingPrice}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Итого</Col>
                      <Col>
                        $
                        {order.totalPrice}
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
    return <></>;
  };

  return (
    <>
      {getContent()}
    </>
  );
  // loading ? <Loader /> : error ? <Message>{error}</Message> : (
  //   <>
  //     <h1>
  //       Заказ
  //       {order._id}
  //     </h1>
  //     <Row>
  //       <Col md={8}>
  //         <ListGroup variant="flush">
  //           <ListGroupItem>
  //             <h2>Доставка</h2>
  //             <p>
  //               <strong className="me-2">Адрес:</strong>
  //               {order.shippingAddress.address}
  //               ,
  //               {'  '}
  //               {order.shippingAddress.city}
  //               ,
  //               {'  '}
  //               {order.shippingAddress.postalCode}
  //               ,
  //               {'  '}
  //               {order.shippingAddress.country}
  //             </p>
  //           </ListGroupItem>
  //           <ListGroupItem>
  //             <h2>Способ оплаты</h2>
  //             <strong className="me-2">
  //               Метод:
  //             </strong>
  //             {order.paymentMethod?.paymentMethod?.toUpperCase()}
  //           </ListGroupItem>
  //           <ListGroupItem>
  //             <h2>Заказываемые товары</h2>
  //             {order.cartItems.length === 0 ? <Message>Ваш заказ пустой</Message> : (
  //               <ListGroup variant="flush">
  //                 {order.orderItems.map((item, index) => (
  //                   <ListGroupItem key={index}>
  //                     <Row>
  //                       <Col md={1}>
  //                         <Image src={item.image} alt={item.name} fluid rounded />
  //                       </Col>
  //                       <Col>
  //                         <Link to={`/product/${item.product}`}>
  //                           {item.name}
  //                         </Link>
  //                       </Col>
  //                       <Col md={4}>
  //                         {item.quantity}
  //                         {' '}
  //                         x $
  //                         {item.price}
  //                         {' '}
  //                         = $
  //                         {(item.quantity * item.price).toFixed(2)}
  //                       </Col>
  //                     </Row>
  //                   </ListGroupItem>
  //                 ))}
  //               </ListGroup>
  //             )}
  //           </ListGroupItem>
  //         </ListGroup>
  //       </Col>
  //       <Col md={4}>
  //         <Card>
  //           <ListGroup variant="flush">
  //             <ListGroupItem>
  //               <h2>Чек</h2>
  //             </ListGroupItem>
  //             <ListGroupItem>
  //               <Row>
  //                 <Col>Товары</Col>
  //                 <Col>
  //                   $
  //                   {order.itemsPrice}
  //                 </Col>
  //               </Row>
  //             </ListGroupItem>
  //             <ListGroupItem>
  //               <Row>
  //                 <Col>Доставка</Col>
  //                 <Col>
  //                   $
  //                   {order.shippingPrice}
  //                 </Col>
  //               </Row>
  //             </ListGroupItem>
  //             <ListGroupItem>
  //               <Row>
  //                 <Col>Итого</Col>
  //                 <Col>
  //                   $
  //                   {order.totalPrice}
  //                 </Col>
  //               </Row>
  //             </ListGroupItem>
  //           </ListGroup>
  //         </Card>
  //       </Col>
  //     </Row>
  //   </>
};

export default OrderScreen;
