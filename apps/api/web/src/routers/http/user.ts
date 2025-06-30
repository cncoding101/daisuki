import { grpc } from '@monorepo/shared-lib';
import express from 'express';
import usersClient from '@/clients/grpc/user';
import { generateGrpcRoutes, GrpcRouteDefinition } from '@/utils/helpers/grpc';

const router = express.Router();

const routeDefinitions: GrpcRouteDefinition[] = [
  {
    client: usersClient,
    rpcMethod: 'create',
    endpoint: '/create',
    httpMethod: 'post',
    transformRequest: grpc.CreateUserRequestDto,
  },
  {
    client: usersClient,
    rpcMethod: 'signIn',
    endpoint: '/sign-in',
    httpMethod: 'post',
    transformRequest: grpc.SigninDto,
  },
];

const routes = generateGrpcRoutes(routeDefinitions);

for (const { method, endpoint, handler } of routes) {
  router[method as keyof Pick<express.Router, 'get' | 'post' | 'put' | 'delete'>](endpoint, handler);
}

export default router;
