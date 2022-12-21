import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const DefaultLayout = ({ children }) => (
  <div className="page">
    <header className="page__header">
      <Header />
    </header>
    <main className="page__main py-3">
      <Container className="main-content">
        {children}
      </Container>
    </main>
    <footer className="page__footer">
      <Footer />
    </footer>
  </div>
);

export default DefaultLayout;
