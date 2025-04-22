import { TRPCError } from '@trpc/server';
import { middleware } from '@/trpc';

const isAuthenticated = middleware(async ({ ctx, next }) => {
  if (ctx.user == null) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You need to be authenticated to access this resource',
    });
  }

  return next();
});

export { isAuthenticated };
