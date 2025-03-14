import { z } from 'zod';
import authRouter from './auth';
import healthRouter from './health';
import { procedure, router } from '@/trpc';

const appRouter = router({
  sayHello: procedure
    .meta({ /* 👉 */ openapi: { method: 'GET', path: '/say-hello' } })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
  health: healthRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

export default appRouter;
