import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import ProductCard from '../../components/ProductCard';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { listProducts } from '../../actions/productAction';

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const productsContent = useMemo(() => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return (<Message variant="danger">{error}</Message>);
    }
    return (
      <Row>
        {products.map((item) => (
          <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>
    );
  }, [productList]);

  return (
    <>
      <h1>Последние продукты</h1>
      {productsContent}
    </>
  );
};

export default Home;
