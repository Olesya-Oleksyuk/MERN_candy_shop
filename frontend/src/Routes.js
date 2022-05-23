import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginScreen from './pages/Login';
import RegisterScreen from './pages/Register';
import ProfileScreen from './pages/Profile';
import ShippingScreen from './pages/Shipping';
import PaymentScreen from './pages/Payment';
import PlaceOrderScreen from './pages/PlaceOrder';

const Routes = () => (
  <>
    <Route path="/placeorder" exact>
      <PlaceOrderScreen />
    </Route>
    <Route path="/payment" exact>
      <PaymentScreen />
    </Route>
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
