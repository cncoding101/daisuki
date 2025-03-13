import { procedure, router } from '@/trpc';
import { live, ready } from '@/controllers/health';
import { basicOutputSchema, emptyInputSchema } from './schemas';

const prefix = '/health';
const healthRouter = router({
  live: procedure
    .meta({ openapi: { method: 'GET', path: `${prefix}/live` } })
    .input(emptyInputSchema)
    .output(basicOutputSchema)
    .query(live),

  ready: procedure
    .meta({ openapi: { method: 'GET', path: `${prefix}/ready` } })
    .input(emptyInputSchema)
    .output(basicOutputSchema)
    .query(ready),
});

export default healthRouter;
