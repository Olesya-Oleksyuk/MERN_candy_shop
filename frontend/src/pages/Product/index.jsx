import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toCurrency } from '../../helpers/data';
import { CURRENCY } from '../../helpers/constants';

import { createProductReview, listProductDetails } from '../../actions/productAction';
import './style.scss';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const currentProductId = productDetails.product._id;

  const productReviewCreated = useSelector(((state) => state.productCreateReview));
  const { success: successProductReview, error: errorProductReview } = productReviewCreated;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { id: productId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (successProductReview) {
      alert('Отзыв оставлен');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${quantity}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

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
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>
                        Цена:
                      </Col>
                      <Col>
                        <strong>
                          {price}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                        Статус:
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? 'В наличии' : 'Нет в наличии'}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Количество:</Col>
                      <Col>
                        <FormSelect value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                          {
                            [...Array(product.countInStock).keys()].map((i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))
                          }
                        </FormSelect>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  )}
                  <ListGroupItem className="d-grid" disabled={!product.countInStock}>
                    <Button type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>
                      Добавить в корзину
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Отзывы</h2>
              {product.reviews.length === 0 && <Message>Отзывов пока нет</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((rew) => (
                  <ListGroupItem key={rew._id}>
                    <strong>{rew.name}</strong>
                    <Rating ratingValue={rew.rating} noReviewsNumber />
                    <p>{rew.createdAt.substr(0, 10)}</p>
                    <p>{rew.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Оставить отзыв</h2>
                  {errorProductReview && <Message variant="danger">{errorProductReview}</Message> }
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="rating" className="mb-2">
                        <FormLabel>Оценка</FormLabel>
                        <FormControl as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                          <option value="">Выбор...</option>
                          <option value="1">1 - Плохо</option>
                          <option value="2">2 - Посредственно</option>
                          <option value="3">3 - Нормально</option>
                          <option value="4">4 - Хорошо</option>
                          <option value="5">5 - Отлично</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comment">
                        <FormLabel>Комментарий</FormLabel>
                        <FormControl as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)} />
                      </FormGroup>
                      <Button type="submit" variant="primary" className="mt-2">
                        Отправить
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Вам необходимо
                      <Link to="/login">авторизоваться</Link>
                      {' '}
                      для написания отзыва
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      );
    }
    return <></>;
  };

  return (
    <>
      <Link className="btn btn-light my-3 return" to="/">Вернуться</Link>
      {getContent()}
    </>
  );
};
export default Product;
