import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './style.scss';

const UserFormContainer = ({ children }) => (
  <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} md={6} lg={4}>
        {children}
      </Col>
    </Row>
  </Container>
);

export default UserFormContainer;
