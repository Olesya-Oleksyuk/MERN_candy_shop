import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3 main-container">
        <Container fluid="xl">
          <Routes />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
