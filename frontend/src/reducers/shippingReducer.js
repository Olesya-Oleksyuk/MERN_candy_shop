import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/shippingConstants';

export const shippingReducer = (state = { shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }
    default:
      return state;
  }
};
