import type { AppRouter } from '@monorepo/web-api';
import { createTRPCReact } from '@trpc/react-query';

export const api = createTRPCReact<AppRouter>();
