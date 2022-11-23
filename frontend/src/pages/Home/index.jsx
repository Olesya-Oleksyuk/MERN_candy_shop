import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/ProductCard';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { listProducts } from '../../actions/productAction';

const Home = () => {
  const dispatch = useDispatch();
  const { keyword: searchKeyword } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(searchKeyword));
  }, [searchKeyword]);

  const productsContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return (<Message variant="danger">{error}</Message>);
    }
    return (
      <Row>
        {products.map((item) => (
          <Col sm={12} md={6} lg={4} xl={3} key={item._id} className="px-5 px-sm-3">
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <h1 className="header-product">Последние продукты</h1>
      {productsContent()}
    </>
  );
};

export default Home;
