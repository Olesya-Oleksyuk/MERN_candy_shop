import React from 'react';
import { Container } from 'react-bootstrap';

import './style.scss';
import HomePage from '../../pages/HomePage/HomePage';

const Main = () => (
  <main className="py-3">
    <Container>
      <HomePage />
    </Container>
  </main>
);

export default Main;
