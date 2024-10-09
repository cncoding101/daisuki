import { ControllerByOperationId } from 'src/controller';
import { STANDARD } from '@/utils/constants/status-code';
import { auth } from '@/business';

const register: ControllerByOperationId<'register'> = async (req, res, next) => {
  try {
    const { message } = await auth.register(req.body);

    return res.status(STANDARD.SUCCESS).json({ message });
  } catch (error) {
    next(error);
  }
};

const login: ControllerByOperationId<'login'> = async (req, res, next) => {
  try {
    const { message, data } = await auth.login(req.body);

    return res.status(STANDARD.SUCCESS).json({ message, token: data });
  } catch (error) {
    next(error);
  }
};

export { register, login };
