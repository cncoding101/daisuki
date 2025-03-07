import { UserProfileAction } from "@store/actions/user-profile";

export type Profile = {
    id: number;
    username: string;
  };

export type UserProfileState =
  | {
      profile: Profile;
      status: 'LOGGED_IN';
    }
  | { status: 'LOGGED_OUT' | 'UNINITIALIZED' };

export const USER_STATES = {
  loggedIn: 'LOGGED_IN',
  loggedOut: 'LOGGED_OUT',
  uninitialized: 'UNINITIALIZED',
} as const;

const initialState: UserProfileState = {
    status: 'UNINITIALIZED',
  };

export const userProfileReducer = (
  state: UserProfileState = initialState,
  action: UserProfileAction,
): UserProfileState => {
  switch (action.type) {
    case 'LOGGED_OUT_USER':
      return { status: 'LOGGED_OUT' };
    case 'LOGGED_IN_USER':
      return { profile: action.profile, status: 'LOGGED_IN' };
    default:
      return state;
  }
};
