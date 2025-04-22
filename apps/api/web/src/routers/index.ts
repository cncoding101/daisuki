import authRouter from './auth';
import healthRouter from './health';
import { router } from '@/trpc';

const appRouter = router({
  health: healthRouter,
  ...authRouter._def.procedures,
});

export type AppRouter = typeof appRouter;

export default appRouter;
