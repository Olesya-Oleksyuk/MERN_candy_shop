import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <header className="page__header">
          <Header />
        </header>
        <main className="page__main py-3">
          <Container className="main-content">
            <Routes />
          </Container>
        </main>
        <footer className="page__footer">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
