import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    login: (state, action) => {},
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
