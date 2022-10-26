import React, { useEffect, useMemo } from 'react';
import {
  Link, useHistory, useLocation, useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, ListGroup, Image, Button, Card, ListGroupItem, FormSelect,
} from 'react-bootstrap';

import Message from '../../components/Message';

import { toCurrency } from '../../helpers/data';
import { CURRENCY } from '../../helpers/constants';

import { addToCart, removeFromCart } from '../../actions/cartAction';
import './style.scss';

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const Cart = () => {
  const { id: productId } = useParams();
  const history = useHistory();

  const query = useQuery();
  const qty = query.get('qty') || 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  const overallProductQuantity = () => cartItems
    .reduce((acc, item) => acc + Number(item.quantity), 0);

  const overallProductPrice = () => toCurrency(cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2), CURRENCY.DEFAULT);

  return (
    <Row>
      <Col md={8}>
        <h1>Корзина товаров</h1>
        {!cartItems.length ? (
          <Message variant="warning">
            Ваша корзина пуста
            <Link to="/" className="ms-4">Вернуться</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link style={{ textDecoration: 'none' }} to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    {toCurrency(item.price, CURRENCY.DEFAULT)}
                  </Col>
                  <Col sm={6} md={2}>
                    <FormSelect
                      value={item.quantity}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {
                          [...Array(item.countInStock).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))
                        }
                    </FormSelect>
                  </Col>
                  <Col sm={2} md={1} className="ms-auto">
                    <Button
                      type="button"
                      variant="outline-dark"
                      className="trash-btn"
                      style={{ marginTop: '5px' }}
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card style={{ marginTop: '8px' }}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Всего (
                {overallProductQuantity()}
                ) товаров в корзине
              </h2>
              {overallProductPrice()}
            </ListGroupItem>
            <ListGroupItem>
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Оформить заказ
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
