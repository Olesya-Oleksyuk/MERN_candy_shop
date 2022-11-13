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
import OrderInCheckoutScreen from './pages/OrderInCheckout';
import OrderOverviewPage from './pages/OrderOverview';
import UserListScreen from './pages/UserList';
import UserEditScreen from './pages/UserEdit';
import ProductList from './pages/ProductList';
import ProductEditScreen from './pages/ProductEdit';
import OrderListScreen from './pages/OrderList';

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
    <Route path="/admin/userlist" exact>
      <UserListScreen />
    </Route>
    <Route path="/admin/user/:id/edit" exact>
      <UserEditScreen />
    </Route>
    <Route path="/admin/productlist" exact>
      <ProductList />
    </Route>
    <Route path="/admin/product/:id/edit" exact>
      <ProductEditScreen />
    </Route>
    <Route path="/admin/orderlist" exact>
      <OrderListScreen />
    </Route>
    <Route path="/" exact>
      <Home />
    </Route>
  </>
);

export default Routes;
