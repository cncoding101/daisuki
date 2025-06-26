import { basicOutputSchema } from './schemas';
import { loginInputSchema, loginOutputSchema, registerInputSchema } from './schemas/auth';
import { login, register } from '@/controllers/auth';
import { procedure, router } from '@/trpc';

const authRouter = router({
  register: procedure
    .meta({ openapi: { method: 'POST', path: '/register' } })
    .input(registerInputSchema)
    .output(basicOutputSchema)
    .mutation(register),

  login: procedure
    .meta({ openapi: { method: 'POST', path: '/login' } })
    .input(loginInputSchema)
    .output(loginOutputSchema)
    .query(login),
});

export default authRouter;
