import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';
import { shippingReducer } from './reducers/shippingReducer';
import { paymentReducer } from './reducers/paymentReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  shipping: shippingReducer,
  payment: paymentReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});

// fetch from the local storage
const fetchCartData = () => {
  const cartDataFromStorage = localStorage.getItem('cartItems');
  if (cartDataFromStorage) {
    return JSON.parse(cartDataFromStorage);
  }
  return [];
};

const fetchUserInfo = () => {
  const userInfoFromStorage = localStorage.getItem('userInfo');
  if (userInfoFromStorage) {
    return JSON.parse(userInfoFromStorage);
  }
  return null;
};

const fetchShippingAddress = () => {
  const shippingAddressFromStorage = localStorage.getItem('shippingAddress');
  if (shippingAddressFromStorage) {
    return JSON.parse(shippingAddressFromStorage);
  }
  return null;
};

const fetchPaymentMethod = () => {
  const paymentMethodFromStorage = localStorage.getItem('paymentMethod');
  if (paymentMethodFromStorage) {
    return JSON.parse(paymentMethodFromStorage);
  }
  return null;
};

const initialState = {
  cart: { cartItems: fetchCartData() },
  userLogin: { userInfo: fetchUserInfo() },
  shipping: { shippingAddress: fetchShippingAddress() },
  payment: fetchPaymentMethod(),
};
const middleware = [thunk];

const store = createStore(reducer, initialState,
  composeWithDevTools(applyMiddleware(...middleware)));

export default store;
