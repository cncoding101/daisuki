import { generateOpenApiDocument } from 'trpc-openapi';
import config from '@/config/sanitized-env';
import appRouter from '@/routers';

export default generateOpenApiDocument(appRouter, {
  title: 'Daisuki OpenApi',
  version: '1.0.0',
  baseUrl: `http://localhost:${config.PORT}/api`,
  description: 'A official Daisuki REST API',
});
