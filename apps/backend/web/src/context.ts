import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';

const createContext = ({ req }: CreateExpressContextOptions) => {
  const token = req.headers.authorization?.split('')[1];

  let user = null;
  if (token != null) {
    try {
      user = jwt.verify(token, 'Hello world');
    } catch {
      console.error('Invalid token');
    }
  }

  return { user };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export default createContext;
