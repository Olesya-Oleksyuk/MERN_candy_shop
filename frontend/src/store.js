import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

// fetch from the local storage

const fetchCartData = () => {
  const cartDataFromStorage = localStorage.getItem('cartItems');
  if (cartDataFromStorage) {
    return JSON.parse(cartDataFromStorage);
  }
  return [];
};

const initialState = {
  cart: { cartItems: fetchCartData() },
};
const middleware = [thunk];

const store = createStore(reducer, initialState,
  composeWithDevTools(applyMiddleware(...middleware)));

export default store;
