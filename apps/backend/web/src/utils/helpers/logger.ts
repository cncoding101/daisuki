import pino from 'pino';
import envConfig from '@/config/sanitized-env';
import path from 'path';
import fs from 'fs';

// Ensure that the logs directory exists
const logDirectory = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const fileTransport = pino.transport({
  target: 'pino/file',
  options: { destination: `${logDirectory}/server.log` },
});

const logger = pino(
  {
    level: envConfig.LOG_LEVEL || 'info',
    ...(envConfig.NODE_ENV === 'development'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              levelFirst: true,
            },
          },
        }
      : {}),
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  },
  fileTransport,
);

export default logger;
