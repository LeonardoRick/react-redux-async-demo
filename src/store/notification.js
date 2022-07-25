import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    showNotification(state, action) {
      const { status, title, message } = action.payload;
      state.message = message;
      state.title = title;
      state.status = status;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
