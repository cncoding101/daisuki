import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import helmet from 'helmet';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import pino from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import envConfig from '@/config/sanitized-env';
import errorHandler from '@/middlewares/global-error-handler';
import { ERROR404 } from '@/utils/constants/status-code';
import logger from '@/utils/helpers/logger';
import rateLimit from '@/utils/helpers/rate-limit';

const PORT = envConfig.PORT ?? 5000;
const services = [
  // {
  //   route: '/users',
  //   target: '',
  // },
  // {
  //   route: '/orders',
  //   target: '',
  // },
  // {
  //   route: '/payments',
  //   target: '',
  // },
  // {
  //   route: '/products',
  //   target: '',
  // },
] as const;
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'api.yaml'));

const buildServer = () => {
  const app = express();

  // middlwares
  app.use(cors());
  app.use(compression());
  app.use(helmet()); // add security headers
  app.disable('x-powered-by'); // hide express server info
  app.use(pino({ logger }));

  // parses incoming req to body
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '1MB' }));

  // rate limiting
  app.use(rateLimit);

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // setup open api validation
  app.use(
    OpenApiValidator.middleware({
      apiSpec: path.join(__dirname, 'swagger', 'api.yaml'),
      operationHandlers: path.join(__dirname, 'controllers'),
    }),
  );

  // setup proxy to microservices
  services.forEach(({ route, target }) => {
    const proxyOptions: Options = {
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: '',
      },
    };

    app.use(route, rateLimit, createProxyMiddleware(proxyOptions));
  });

  // TODO add authentication

  // TODO add cache layer using redis

  // TODO add swagger ui with auto generated routes from controllers

  app.use('*', (_, res) => {
    res.status(404).json(ERROR404);
  });

  app.use(errorHandler);

  return app;
};

const main = async () => {
  try {
    const app = buildServer();

    app.listen(PORT, () => {
      console.log(`Server i running on port ${PORT}`);
    });

    // // Graceful shutdown function
    // const gracefulShutdown = (signal: string) => {
    //   logger.info(`Received ${signal}. Shutting down gracefully...`);

    //   server.close(() => {
    //     logger.info('Closed out remaining connections');
    //     process.exit(0);
    //   });

    //   setTimeout(() => {
    //     logger.fatal('Could not close connections in time, forcefully shutting down');
    //     process.abort(); // exit immediately and generate a core dump file
    //   }, 1000).unref();
    //   process.exit(1);
    //   // Optional: Close other resources like database connections, etc.
    // };

    // // Listen for termination signals
    // process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    // process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (err) {
    logger.fatal(err);
    process.exit(1);
  }
};

// used to indicate if the script should be ran directly or not
if (require.main === module) main();

// for testing purposes
export default buildServer;
