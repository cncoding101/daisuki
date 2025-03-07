import { combineReducers } from '@reduxjs/toolkit';
import { userProfileReducer } from './user-profile';

const reducers = {
  userProfile: userProfileReducer,
};

export const rootReducer = combineReducers(reducers);
