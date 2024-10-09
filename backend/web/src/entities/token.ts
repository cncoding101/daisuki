import jwt from 'jsonwebtoken';

interface Sign {
  email: string;
  secret: string;
  expiresIn?: string;
}

export default ({ email, secret, expiresIn = '15m' }: Sign) => {
  const token = jwt.sign({ email }, secret, { expiresIn });

  return Object.freeze(token);
};
