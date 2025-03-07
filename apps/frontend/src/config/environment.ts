const release = import.meta.env.RELEASE ?? 'unknown-release';

type HttpUrl = `http://${string}`;
type HttpsUrl = `https://${string}`;
type Environment = 'development' | 'production' | 'staging' | 'test';

type Config = {
  appName: string;
  environment: Environment;
  release: string;
  urls: {
    frontend: HttpsUrl | HttpUrl;
  };
};

const getEnvironment = (): Environment => {
  const env = import.meta.env.NODE_ENV ?? 'development'; // Default to 'development' if undefined

  switch (env.toLowerCase()) {
    case 'production':
      return 'production';
    case 'staging':
      return 'staging';
    case 'test':
      return 'test';
    case 'development':
    default:
      return 'development';
  }
};

const environment = getEnvironment();

const appName = 'Daisuki';

const getEnvironmentConfig = (): Config => {
  switch (environment) {
    case 'production':
      return {
        appName,
        environment,
        release,
        urls: {
          frontend: 'https://www.daisuki.com',
        },
      };

    case 'development':
      return {
        appName,
        environment,
        release,
        urls: {
          frontend: 'http://localhost',
        },
      };

    default:
      return {
        appName,
        environment,
        release,
        urls: {
          frontend: 'http://www.daisuki.staging.com',
        },
      };
  }
};

export const getConfig = (): Config => {
  const config = getEnvironmentConfig();
  return config;
};

export const config = getConfig();
