import bcrypt from 'bcrypt';
import type { components } from '@/api.d.ts';
import { AppError, NotFoundError } from '@/utils/helpers/error';

// in memory user data
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export const users: { email: string; password: string; firstname?: string; lastname?: string; address?: Address }[] =
  [];

export default async ({
  email,
  password,
  firstname,
  lastname,
  address,
}: components['schemas']['Register']): Promise<{
  message: string;
}> => {
  // check if user exist
  const exists = users.find((user) => (user.email = email));
  if (exists) throw new NotFoundError();

  // return { message: `A email by ${email} already exists!`, code: 400 };
  // create new hash using crypt
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw new AppError();

  const hashedPassword = await bcrypt.hash(password, salt);
  if (!hashedPassword) throw new AppError();

  users.push({ email, password: hashedPassword, firstname, lastname, address });

  return { message: 'User has been registered successfully' };
};
