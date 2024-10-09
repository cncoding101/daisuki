import 'dotenv/config';
import Ajv from 'ajv';
import envSchema from 'env-schema';
import { LogLevel } from '@/utils/enums/logger';
import { NodeEnv } from '@/utils/enums/environment';

type Env = {
  PORT: number;
  LOG_LEVEL: LogLevel;
  NODE_ENV: NodeEnv;
};

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allowUnionTypes: true,
});

const schema = {
  type: 'object',
  properties: {
    PORT: { type: 'number' },
    LOG_LEVEL: { type: 'string', enum: Object.values(LogLevel) },
    NODE_ENV: { type: 'string', enum: Object.values(NodeEnv) },
  },
} as const;

const config = envSchema<Env>({
  schema,
  dotenv: true,
  ajv,
});

export default config;
