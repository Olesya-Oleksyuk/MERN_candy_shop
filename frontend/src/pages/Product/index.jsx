import React from 'react';
import {
  Row, Col, Image, ListGroup, Card, Button, ListGroupItem,
} from 'react-bootstrap';

import { Link, useParams } from 'react-router-dom';
import products from '../../mocks/products';
import Rating from '../../components/Rating';
import { toCurrency } from '../../helpers/data';

const Product = () => {
  const { id: productId } = useParams();
  const product = products.find((i) => i._id === productId);
  const price = toCurrency(product.price, 'USD', 'en-US');

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Вернуться</Link>
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
    </>
  );
};
export default Product;
