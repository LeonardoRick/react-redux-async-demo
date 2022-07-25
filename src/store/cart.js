import { createSlice } from '@reduxjs/toolkit';

const cartItemsSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [{ title: 'Test', quantity: 3, total: 18, price: 6, id: 1 }],
    totalAmount: 18,
    totalQuantity: 3,
  },
  reducers: {
    addItem(state, item) {
      let newItem = true;
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
  },
});

export const cartActions = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
