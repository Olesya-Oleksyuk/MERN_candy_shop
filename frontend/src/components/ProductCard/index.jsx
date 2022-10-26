import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './style.scss';

import Rating from '../Rating';
import { toCurrency } from '../../helpers/data';
import { CURRENCY } from '../../helpers/constants';

const ProductCard = ({ product }) => {
  const price = toCurrency(product.price, CURRENCY.DEFAULT);

  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`} className="product-link">
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              ratingValue={product.rating}
              reviewsNumber={product.numReviews}
            />
          </Card.Text>
          <Card.Text as="h3" className="py-3">
            {price}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.number,
    numReviews: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

export default React.memo(ProductCard);
