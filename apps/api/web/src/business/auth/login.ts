import bcrypt from 'bcrypt';
import tokenEntity from '@/entities/token';
import { LoginInput, LoginOutput } from '@/routers/schemas/auth';
import { ValidationError } from '@/utils/helpers/error';

export default async ({ email, password }: LoginInput['input']): Promise<LoginOutput> => {
  // const exists = users.find((user) => user.email === email);
  const exists = { password: 'helloworld' };
  if (exists == null) throw new ValidationError(`A email by ${email} is not registered!`);
  // validate
  const isPasswordValid = await bcrypt.compare(password, exists.password);
  if (!isPasswordValid) throw new ValidationError('Incorrect password');
  // generate token
  const token = tokenEntity({ email, secret: 'Hello world' });
  return { message: `Successfully logged in`, token };
};
