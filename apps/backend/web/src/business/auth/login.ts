import bcrypt from 'bcrypt';
import type { components, operations } from '@/api.d.ts';
import { users } from '@/business/auth/register';
import tokenEntity from '@/entities/token';
import { ValidationError } from '@/utils/helpers/error';

export default async ({
  email,
  password,
}: components['schemas']['Login']): Promise<{
  message: string;
  data: operations['login']['responses']['200']['content']['application/json']['token'];
}> => {
  // find user
  const exists = users.find((user) => user.email === email);
  if (!exists) throw new ValidationError(`A email by ${email} is not registered!`);
  // validate
  const isPasswordValid = await bcrypt.compare(password, exists.password);
  if (!isPasswordValid) throw new ValidationError('Incorrect password');
  // generate token
  const token = tokenEntity({ email, secret: 'Hello world' });
  return { message: `Successfully logged in`, data: token };
};
