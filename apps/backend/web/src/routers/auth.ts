import { login, register } from '@/controllers/auth';
import { procedure, router } from '@/trpc';
import { loginInputSchema, registerInputSchema } from './schemas/auth';
import { basicOutputSchema } from './schemas';

const authRouter = router({
  register: procedure
    .meta({ openapi: { method: 'POST', path: '/register' } })
    .input(registerInputSchema)
    .output(basicOutputSchema)
    .mutation(register),

  login: procedure
    .meta({ openapi: { method: 'POST', path: '/login' } })
    .input(loginInputSchema)
    .output(basicOutputSchema)
    .query(login),
});

export default authRouter;
