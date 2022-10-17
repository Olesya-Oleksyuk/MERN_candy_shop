import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const copyrightText = 'Copyright \u00a9 CandyShop';
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            {copyrightText}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
