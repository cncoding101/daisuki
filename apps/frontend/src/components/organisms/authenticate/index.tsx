import { authenticateUser } from '@store/actions/user-profile';
import { useDispatch } from '@store/redux-hooks';
import { getUserProfileSelector } from '@store/selectors/user-profile';
import { unreachableWithReturn } from '@utils/helpers/unreachable';
import { ReactNode, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

type IProps = {
  children: ReactNode;
};

const Authenticate: React.FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserProfileSelector);

  useEffect(() => {
    void dispatch(authenticateUser());
  }, [dispatch]);

  const userStatus = useMemo(() => {
    switch (user.status) {
      case 'LOGGED_IN':
        return { id: user.profile.id.toString(), type: 'user' } as const;
      case 'UNINITIALIZED':
      case 'LOGGED_OUT':
        return undefined;
      default:
        return unreachableWithReturn(user, undefined);
    }
  }, [user]);

  if (userStatus != null) return children;
};

export default Authenticate;
