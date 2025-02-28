import { combineSlices } from "@reduxjs/toolkit";
import { authSlice } from "@store/slices/auth";

export const rootReducer = combineSlices(authSlice);