import jwt, { SignOptions } from 'jsonwebtoken';

interface Sign {
  email: string;
  secret: string;
  expiresIn?: string;
}

export default ({ email, secret, expiresIn = '15m' }: Sign) => {
  // NOTE wierd type issues from expiresIn
  const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
  const token = jwt.sign({ email }, secret, options);

  return Object.freeze(token);
};
