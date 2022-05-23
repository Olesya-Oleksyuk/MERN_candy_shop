import { SAVE_PAYMENT_METHOD } from '../constants/paymentConstants';

export const paymentReducer = (state = { paymentMethod: {} }, action) => {
  switch (action.type) {
    case SAVE_PAYMENT_METHOD: {
      console.log(action.payload);
      return {
        ...state,
        paymentMethod: action.payload,
      };
    }
    default:
      return state;
  }
};
