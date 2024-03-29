import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import ProfileScreen from './pages/Profile';
import ShippingScreen from './pages/Shipping';
import PaymentScreen from './pages/Payment';
import OrderInCheckoutScreen from './pages/OrderInCheckout';
import OrderOverviewPage from './pages/OrderOverview';
import UserListScreen from './pages/UserList';
import UserEditScreen from './pages/UserEdit';
import ProductList from './pages/ProductList';
import ProductEditScreen from './pages/ProductEdit';
import OrderListScreen from './pages/OrderList';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';

const Routes = () => (
  <>
    <Route path="/orders/:id" exact>
      <OrderOverviewPage />
    </Route>
    <Route path="/placeorder" exact>
      <OrderInCheckoutScreen />
    </Route>
    <Route path="/payment" exact>
      <PaymentScreen />
    </Route>
    <Route path="/shipping" exact>
      <ShippingScreen />
    </Route>
    <Route path="/login" exact>
      <Login />
    </Route>
    <Route path="/register" exact>
      <Register />
    </Route>
    <Route path="/profile" exact>
      <ProfileScreen />
    </Route>
    <Route path="/product/:id">
      <Product />
    </Route>
    <Route path="/cart/:id?" exact>
      <Cart />
    </Route>
    <Route path="/home" exact>
      <Home />
    </Route>
    <Route path="/admin/userlist" exact>
      <UserListScreen />
    </Route>
    <Route path="/admin/user/:id/edit" exact>
      <UserEditScreen />
    </Route>
    <Route path="/admin/productlist" exact>
      <ProductList />
    </Route>
    <Route path="/admin/productlist/:pageNumber" exact>
      <ProductList />
    </Route>
    <Route path="/admin/product/:id/edit" exact>
      <ProductEditScreen />
    </Route>
    <Route path="/admin/orderlist" exact>
      <OrderListScreen />
    </Route>
    <Route path="/search/:keyword" exact>
      <Home />
    </Route>
    <Route path="/page/:pageNumber" exact>
      <Home />
    </Route>
    <Route path="/search/:keyword/page/:pageNumber" exact>
      <Home />
    </Route>
    <Route path="/welcome" exact>
      <Welcome />
    </Route>
    <Route path="/" exact>
      <Welcome />
    </Route>
    <Redirect to="/" />
  </>
);

export default Routes;
