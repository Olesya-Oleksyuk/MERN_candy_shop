import React, { useEffect, useMemo } from 'react';
import {
  Link, useHistory, useLocation, useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, ListGroup, Image, Form, Button, Card,
} from 'react-bootstrap';
import Message from '../../components/Message';
import { addToCart } from '../../actions/cartAction';

function useQuery() {
  const { search } = useLocation();
  console.log('search', search);
  console.log(' URLSearchParams(search)', new URLSearchParams(search));

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Cart = () => {
  const { id: productId } = useParams();
  const history = useHistory();

  const query = useQuery();
  const qty = query.get('qty') || 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log('cart', cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return <div> Cart </div>;
};

export default Cart;
