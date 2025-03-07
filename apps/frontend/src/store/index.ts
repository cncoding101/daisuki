import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { UserProfileAction } from './actions/user-profile';
import { rootReducer } from './reducers';
import { UserProfileState } from './reducers/user-profile';

export const createReduxStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type State = {
  userProfile: UserProfileState;
};

export type Action = UserProfileAction;

export type Store = ReturnType<typeof createReduxStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = ThunkDispatch<State, void, Action>;
export type Selector<Selected> = (state: State) => Selected;

export default createReduxStore();
