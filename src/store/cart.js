import { createSlice } from '@reduxjs/toolkit';
import { notificationActions } from './notification';

const cartItemsSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    isUpdate: false,
  },
  reducers: {
    addItem(state, item) {
      let newItem = true;
      state.isUpdate = true;
      state.items.forEach((previous) => {
        if (item.payload.id === previous.id) {
          previous.quantity += 1;
          previous.total += previous.price;
          newItem = false;
        }
      });

      if (newItem) {
        state.items.push({
          ...item.payload,
          quantity: 1,
          total: item.payload.price,
        });
      }
      state.totalQuantity += 1;
      state.totalAmount += item.payload.price;
      state.items.sort((a, b) => (a.title > b.title ? 1 : -1));
    },

    removeItem(state, id) {
      state.isUpdate = true;
      const index = state.items.findIndex(
        (previous) => id.payload === previous.id
      );
      const item = state.items[index];
      if (item.quantity === 1) {
        state.items.splice(index, 1);
      } else {
        item.quantity -= 1;
        item.total -= item.price;
      }
      state.totalQuantity -= 1;
      state.totalAmount -= item.price;
    },

    replaceCart(state, cart) {
      cart.payload.isUpdate = false;
      return { ...cart.payload };
    },
  },
});

const errorObject = {
  title: 'Error!',
  message: 'Backend error!',
  status: 'error',
};

// this functions are a Action Creator Thunks, so they can be dispatched as dispatch(sendCartData(cart))
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        title: 'Sending...',
        message: 'The list is being updated, wait.',
        status: 'pending',
      })
    );

    const sendRequest = async () => {
      const response = await fetch('/cart', {
        method: 'PUT',
        body: JSON.stringify(cart),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data) {
        dispatch(notificationActions.showNotification(errorObject));
      }
    };

    try {
      await sendRequest();
    } catch (e) {
      dispatch(notificationActions.showNotification(errorObject));
    }

    dispatch(
      notificationActions.showNotification({
        title: 'Success!',
        message: 'List updated successfully',
        status: 'success',
      })
    );
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('/cart');
      return await response.json();
    };

    try {
      const cart = await fetchData();
      dispatch(cartActions.replaceCart(cart));
      return true;
    } catch (e) {
      dispatch(notificationActions.showNotification(errorObject));
      return false;
    }
  };
};
export const cartActions = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
