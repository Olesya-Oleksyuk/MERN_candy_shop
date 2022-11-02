import React from 'react';
import { Col, Row } from 'react-bootstrap';

import EditProfileInfoForm from '../../components/EditProfileInfoForm';
import OrdersTable from '../../components/OrdersTable';

const ProfileScreen = () => (
  <>
    <Row>
      <Col md={3}>
        <h2>Профиль</h2>
        <EditProfileInfoForm />
      </Col>
      <Col>
        <h2>Мои заказы</h2>
        <OrdersTable />
      </Col>
    </Row>
  </>
);

export default ProfileScreen;
