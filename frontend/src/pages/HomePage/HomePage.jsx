import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Product from '../../components/Product';

import products from '../../mocks/products';

const HomePage = () => (
  <>
    <h1>Последние продукты</h1>
    <Row>
      {products.map((item) => (
        <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
          <Product product={item} />
        </Col>
      ))}
    </Row>
  </>
);

export default HomePage;
