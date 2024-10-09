import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/slices/auth';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
