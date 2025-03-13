import { middleware } from '@/trpc';
import { TRPCError } from '@trpc/server';

const isAuthenticated = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You need to be authenticated to access this resource',
    });
  }

  return next();
});

export { isAuthenticated };
