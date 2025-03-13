import { basicOutputSchema, emptyInputSchema } from './schemas';
import { live, ready } from '@/controllers/health';
import { procedure, router } from '@/trpc';

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
