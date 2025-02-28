import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';


export const createReduxStore = () => 
  configureStore({
    reducer: rootReducer,
  })

export type Store = ReturnType<typeof createReduxStore>

const b = "    "