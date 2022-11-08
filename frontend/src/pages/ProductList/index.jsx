import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button, Col, Row, Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../../components/Loader';
import Message from '../../components/Message';

import { CURRENCY } from '../../helpers/constants';
import { toCurrency } from '../../helpers/data';

import { listProducts } from '../../actions/productAction';

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const createProductHandler = () => {};

  const deleteHandler = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить продукт?')) {
      // dispatch(deleteProducts(id));
      console.log('delete product');
    }
  };

  const getTableProductList = () => {
    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;
    if (products) {
      return (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>НАЗВАНИЕ</th>
              <th>ЦЕНА</th>
              <th>КАТЕГОРИЯ</th>
              <th>БРЕНД</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{toCurrency(product.price, CURRENCY.DEFAULT)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td style={{ textAlign: 'center' }}>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="link" size="sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" size="sm" onClick={() => deleteHandler(product._id)}>
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return <></>;
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Продукты</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus" />
            {' '}
            Создать продукт
          </Button>
        </Col>
      </Row>
      {getTableProductList()}
    </>
  );
};

export default ProductList;
