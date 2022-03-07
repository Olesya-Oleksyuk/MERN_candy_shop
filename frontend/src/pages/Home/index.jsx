import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import ProductCard from '../../components/ProductCard';
import { listProducts } from '../../actions/productAction';

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Последние продукты</h1>
      { loading ? <h1>Loading...</h1> : error ? <h3>{error}</h3>
        : (
          <Row>
            {products.map((item) => (
              <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
                <ProductCard product={item} />
              </Col>
            ))}
          </Row>
        )}
    </>
  );
};

export default Home;
