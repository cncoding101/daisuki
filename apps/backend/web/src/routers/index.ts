import healthRouter from './health';
import authRouter from './auth';
import { router } from '@/trpc';

const appRouter = router({
  health: healthRouter,
  auth: authRouter,
});

export default appRouter;
