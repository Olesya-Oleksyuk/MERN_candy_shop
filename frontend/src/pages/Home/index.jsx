import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/ProductCard';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ProductPagination from '../../components/ProductPagination';

import { listProducts } from '../../actions/productAction';

const Home = () => {
  const dispatch = useDispatch();
  const { keyword: searchKeyword, pageNumber: pageNumberParam } = useParams();
  const pageNumber = pageNumberParam || 1;

  const productList = useSelector((state) => state.productList);
  const {
    loading, error, products, page, pages,
  } = productList;

  useEffect(() => {
    dispatch(listProducts(searchKeyword, pageNumber));
  }, [searchKeyword, pageNumber]);

  const productsContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return (<Message variant="danger">{error}</Message>);
    }
    return (
      <Row className="px-3 px-md-5">
        {products.map((item) => (
          <Col xs={6} sm={6} md={6} lg={4} xl={3} key={item._id} className="px-1 px-sm-2 ">
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <h1 className="header-1">Последние продукты</h1>
      {productsContent()}
      <ProductPagination pages={pages} page={page} keyword={searchKeyword || ''} />
    </>
  );
};

export default Home;
