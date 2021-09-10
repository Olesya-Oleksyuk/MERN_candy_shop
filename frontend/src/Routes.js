import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/Product';

const Routes = () => (
  <>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/product/:id">
      <Product />
    </Route>
  </>
);

export default Routes;
