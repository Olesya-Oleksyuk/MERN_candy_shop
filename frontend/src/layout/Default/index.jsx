import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const DefaultLayout = ({ noFooter = false, children }) => (
  <div className="page">
    <header className="page__header">
      <Header />
    </header>
    <main className={`page__main ${noFooter ? 'page__main--no-footer' : ''}`}>
      <Container className="main-content">
        {children}
      </Container>
    </main>
    { !noFooter
      && (
      <footer className="page__footer">
        <Footer />
      </footer>
      )}
  </div>
);

export default DefaultLayout;
