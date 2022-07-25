import { configureStore } from '@reduxjs/toolkit';
import toggleCartReducer from './toggle-cart';
import cartReducer from './cart';
import notificationReducer from './notification';
const store = configureStore({
  reducer: {
    toggleCart: toggleCartReducer,
    cart: cartReducer,
    notification: notificationReducer,
  },
});
export default store;
