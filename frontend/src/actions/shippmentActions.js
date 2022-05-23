import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/shippingConstants';

// сохранение адресных данных в local storage
export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  // сохранение в локальном хранилище
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
