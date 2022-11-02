import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { listUsers } from '../../actions/userActions';

import Loader from '../../components/Loader';
import Message from '../../components/Message';

const UserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log('delete: ', id);
  };

  const getTableUserList = () => {
    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;
    if (users) {
      return (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>ИМЯ</th>
              <th>EMAIL</th>
              <th style={{ textAlign: 'center' }}>АДМИН</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td style={{ textAlign: 'center' }}>
                  {user.isAdmin
                    ? (<i className="fas fa-check" style={{ color: '#48E5C2' }} />)
                    : (<i className="fas fa-times" style={{ color: 'red' }} />)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="link" size="sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" size="sm" onClick={() => deleteHandler(user._id)}>
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  };

  return (
    <>
      <h1>Users</h1>
      {getTableUserList()}
    </>
  );
};

export default UserListScreen;
