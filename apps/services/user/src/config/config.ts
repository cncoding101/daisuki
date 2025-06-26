import { registerAs } from '@nestjs/config';

export enum ConfigKey {
  App = 'APP',
  Db = 'DB',
}

export enum Environment {
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Testing = 'testing',
}

const APPConfig = registerAs(ConfigKey.App, () => ({
  env: Environment[process.env.NODE_ENV as keyof typeof Environment],
  port: Number(process.env.APP_PORT),
}));

const DBConfig = registerAs(ConfigKey.Db, () => ({
  url: process.env.DATABASE_URL,
}));

export const configurations = [APPConfig, DBConfig];
