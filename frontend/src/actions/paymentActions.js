import { SAVE_PAYMENT_METHOD } from '../constants/paymentConstants';

// сохранение адресных данных в local storage
export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  });

  // сохранение в локальном хранилище
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

// SAVE_PAYMENT_METHOD
