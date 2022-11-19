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

import { createProduct, deleteProduct, listProducts } from '../../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: loggedInUser } = userLogin;

  useEffect(() => {
    if (loggedInUser && loggedInUser.isAdmin) {
      if (successCreate) {
        dispatch({ type: PRODUCT_CREATE_RESET });
        history.push(`/admin/product/${createdProduct._id}/edit`);
      } else {
        dispatch(listProducts());
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, loggedInUser, successDelete, successCreate, createdProduct]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteHandler = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить продукт?')) {
      dispatch(deleteProduct(id));
    }
  };

  const deleteProductProgress = () => {
    if (errorDelete) {
      return <Message variant="danger">{errorCreate}</Message>;
    }
    return <></>;
  };

  const createProductProgress = () => {
    if (loadingCreate) {
      return <Loader />;
    }
    if (errorCreate) {
      return <Message variant="danger">{errorCreate}</Message>;
    }
    return <></>;
  };

  const getTableProductList = () => {
    if (!loadingCreate && !successCreate) {
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
    }
    return <></>;
  };

  return (
    <>
      {!loadingCreate && (
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
      )}
      {deleteProductProgress()}
      {createProductProgress()}
      {getTableProductList()}
    </>
  );
};

export default ProductList;