import React, { useEffect } from 'react';
import {
  Row, Col, Image, ListGroup, Card, Button, ListGroupItem,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toCurrency } from '../../helpers/data';

import { listProductDetails } from '../../actions/productAction';
import './style.scss';

const Product = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const currentProductId = productDetails.product._id;

  const { id: productId } = useParams();

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, []);

  const price = toCurrency(product.price, 'USD', 'en-US');

  const getContent = () => {
    if (loading || (currentProductId !== productId)) {
      return <Loader />;
    }
    if (error) {
      return (<Message variant="danger">{error}</Message>);
    }
    if (product._id === productId) {
      return (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating reviewsNumber={product.numReviews} ratingValue={product.rating} />
              </ListGroup.Item>
              <ListGroup.Item>
                <div>
                  Цена:
                  {' '}
                  {price}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>
                  Описание:
                  {' '}
                  {product.description}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>
                      Цена:
                    </Col>
                    <Col>
                      <strong>
                        {price}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Статус:
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? 'В наличии' : 'Нет в наличии'}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="d-grid" disabled={!product.countInStock}>
                  <Button type="button">
                    Добавить в корзину
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      );
    }
    return <></>;
  };

  return (
    <>
      <Link className="btn btn-light my-3 return" to="/">Вернуться</Link>
      {getContent()}
    </>
  );
};
export default Product;
