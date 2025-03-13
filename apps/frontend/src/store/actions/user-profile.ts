import { Profile } from '@store/reducers/user-profile';
import { either } from 'fp-ts';
import { DispatchType } from '..';

const LOGGED_IN_USER = 'LOGGED_IN_USER';
type LoggedInUserAction = {
  profile: Profile;
  type: typeof LOGGED_IN_USER;
};
const loggedInUser = (profile: Profile): LoggedInUserAction => ({
  profile,
  type: LOGGED_IN_USER,
});

const LOGGED_OUT_USER = 'LOGGED_OUT_USER';
type LoggedOutUserAction = {
  type: typeof LOGGED_OUT_USER;
};
export const loggedOutUser = (): LoggedOutUserAction => ({
  type: LOGGED_OUT_USER,
});

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
type AuthenticateUserAction = {
  type: typeof AUTHENTICATE_USER;
};
export const authenticateUser =
  () =>
  async (dispatch: DispatchType): Promise<void> => {
    // Simulating a fake API response with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fakeApiResponse = {
      id: 123,
      username: 'John Doe',
    };

    const result = either.right(fakeApiResponse);

    if (either.isLeft(result)) {
      dispatch(loggedOutUser());
      return;
    }

    const profile = result.right;
    dispatch(loggedInUser(profile));
  };

export type UserProfileAction = AuthenticateUserAction | LoggedInUserAction | LoggedOutUserAction;
