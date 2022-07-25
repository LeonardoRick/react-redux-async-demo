import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      const { status, title, message } = action.payload;
      return {
        status,
        title,
        message,
      };
    },
    hideNotification(state) {
      return null;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
