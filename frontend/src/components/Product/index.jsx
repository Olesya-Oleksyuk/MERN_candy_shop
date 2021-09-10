import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './style.scss';
import { toCurrency } from '../../helpers/data';

const Product = ({ product }) => {
  const price = toCurrency(product.price, 'USD', 'en-US');

  return (
    <>
      <Card className="my-3 p-3 rounded">
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </a>
        <Card.Body>
          <a href={`/product/${product._id}`} className="product-link">
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </a>
          <Card.Text as="h3" className="py-3">
            {price}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.number,
    numReviews: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

export default React.memo(Product);
