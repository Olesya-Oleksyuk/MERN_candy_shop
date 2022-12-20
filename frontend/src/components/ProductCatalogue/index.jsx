import React from 'react';
import { Col } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import ProductCard from '../ProductCard';

const ProductCatalogue = ({
  products, loading, error,
}) => {

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (<Message variant="danger">{error}</Message>);
  }

  return (
    <>
      { Object.entries(products).length !== 0 && products.map((item) => (
        <Col xs={6} sm={6} md={6} lg={4} xl={3} key={item._id} className="px-1 px-sm-2 ">
          <ProductCard product={item} />
        </Col>
      ))}
    </>
  );
};

export default ProductCatalogue;
