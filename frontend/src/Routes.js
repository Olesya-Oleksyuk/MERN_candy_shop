import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';

const Routes = () => (
  <>
    <Route path="/product/:id" exact>
      <Product />
    </Route>
    <Route path="/home" exact>
      <Home />
    </Route>
    <Route path="/cart/:id?">
      <Cart />
    </Route>
    <Route path="/" exact>
      <Home />
    </Route>
  </>
);

export default Routes;
