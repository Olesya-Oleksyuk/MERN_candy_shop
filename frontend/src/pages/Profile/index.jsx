import React from 'react';
import { Col, Row } from 'react-bootstrap';

import EditProfileInfoForm from '../../components/EditProfileInfoForm';
import OrdersTable from '../../components/OrdersTable';

const ProfileScreen = () => (
  <>
    <Row>
      <Col sm={12} md={12} lg={3} className="px-sm-6 px-lg-3">
        <h2>Профиль</h2>
        <EditProfileInfoForm />
      </Col>
      <Col lg={9}>
        <h2>Мои заказы</h2>
        <OrdersTable />
      </Col>
    </Row>
  </>
);

export default ProfileScreen;
