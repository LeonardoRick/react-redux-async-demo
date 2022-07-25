import { createSlice } from '@reduxjs/toolkit';

const toggleCartSlice = createSlice({
  name: 'toggleCart',
  initialState: { show: true },
  reducers: {
    toggle(state) {
      state.show = !state.show;
    },
  },
});

export const toggleCartActions = toggleCartSlice.actions;
export default toggleCartSlice.reducer;
