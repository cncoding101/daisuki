import { TRPCError } from '@trpc/server';
import { auth } from '@/business';
import { LoginInput, RegisterInput } from '@/routers/trpc/schemas/auth';
import { AppError } from '@/utils/helpers/error';

const register = async ({ input }: RegisterInput) => {
  try {
    const { message } = await auth.register(input);

    return { message };
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: error instanceof AppError ? error.message : 'Registration failed',
    });
  }
};

const login = async ({ input }: LoginInput) => {
  try {
    const { message, token } = await auth.login(input);

    return { message, token };
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: error instanceof AppError ? error.message : 'Login failed',
    });
  }
};

export { register, login };
