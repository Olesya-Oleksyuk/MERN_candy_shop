import React, { useEffect } from 'react';
import {
  Col, Image, ListGroup, Row,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLayout from '../../layout/Default';
import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import PriceTag from '../../components/PriceTag';

import { toCurrency } from '../../helpers/data';
import { CURRENCY } from '../../helpers/constants';

import { listProductDetails } from '../../actions/productAction';
import ReviewsSection from '../../components/ReviewsSection';

const Product = () => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const currentProductId = productDetails.product._id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { id: productId } = useParams();

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [productId]);

  const price = toCurrency(product.price, CURRENCY.DEFAULT);

  const getContent = () => {
    if (loading || (currentProductId !== productId)) {
      return <Loader />;
    }
    if (error) {
      return (<Message variant="danger">{error}</Message>);
    }

    if (product._id === productId) {
      return (
        <>
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
                    Цена:&nbsp;
                    {price}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    Описание:&nbsp;
                    {product.description}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <PriceTag
                productInfo={{
                  productId,
                  productPrice: price,
                  countInStock: product.countInStock,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="my-3">
              <ReviewsSection
                reviews={product.reviews}
                productId={productId}
                isLoggedIn={userInfo}
              />
            </Col>
          </Row>
        </>
      );
    }
    return <></>;
  };

  return (
    <DefaultLayout>
      <Row xs="auto">
        <Col>
          <Link className="btn btn-return my-3" to="/home">Вернуться</Link>
        </Col>
      </Row>
      {getContent()}
    </DefaultLayout>
  );
};
export default Product;
