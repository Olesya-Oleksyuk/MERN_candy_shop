import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
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

const initialState = {
  cart: { cartItems: fetchCartData() },
  userLogin: { userInfo: fetchUserInfo() },
};
const middleware = [thunk];

const store = createStore(reducer, initialState,
  composeWithDevTools(applyMiddleware(...middleware)));

export default store;
