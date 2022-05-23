import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/Profile';
import ShippingScreen from './pages/Shipping';

const Routes = () => (
  <>
    <Route path="/shipping" exact>
      <ShippingScreen />
    </Route>
    <Route path="/login" exact>
      <LoginScreen />
    </Route>
    <Route path="/register" exact>
      <RegisterScreen />
    </Route>
    <Route path="/profile" exact>
      <ProfileScreen />
    </Route>
    <Route path="/product/:id" exact>
      <Product />
    </Route>
    <Route path="/cart/:id?">
      <Cart />
    </Route>
    <Route path="/home" exact>
      <Home />
    </Route>
    <Route path="/" exact>
      <Home />
    </Route>
  </>
);

export default Routes;
