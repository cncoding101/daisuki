import { OpenApiMeta } from 'trpc-openapi';
import { Context } from './context';
import { initTRPC } from '@trpc/server';

const t = initTRPC.context<Context>().meta<OpenApiMeta>().create();

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
