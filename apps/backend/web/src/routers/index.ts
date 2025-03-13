import authRouter from './auth';
import healthRouter from './health';
import { router } from '@/trpc';

const appRouter = router({
  health: healthRouter,
  auth: authRouter,
});

export default appRouter;
