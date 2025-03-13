import { generateOpenApiDocument } from 'trpc-openapi';
import appRouter from './routers';

export default generateOpenApiDocument(appRouter, {
  title: 'Daisuki OpenApi',
  version: '1.0.0',
  baseUrl: 'http://localhost:5173/v1',
  description: 'A official Daisuki REST API',
});
