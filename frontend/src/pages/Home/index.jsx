import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import ProductCard from '../../components/ProductCard';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { listProducts } from '../../actions/productAction';
import { PRODUCT_LIST_RESET } from '../../constants/productConstants';

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {
    loading, error, products, requiredReset,
  } = productList;

  useEffect(() => {
    // get products from the server only when page is reloaded manually
    dispatch(listProducts());
    return function leaveHomePage() {
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, []);

  const productsContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return (<Message variant="danger">{error}</Message>);
    }
    if (!requiredReset) {
      return (
        <Row>
          {products.map((item) => (
            <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
              <ProductCard product={item} />
            </Col>
          ))}
        </Row>
      );
    }
    return <></>;
  };

  return (
    <>
      <h1>Последние продукты</h1>
      {productsContent()}
    </>
  );
};

export default Home;
