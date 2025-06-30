import { status as grpcStatus } from '@grpc/grpc-js';
import { Request, Response, NextFunction } from 'express';

const grpcToHttpStatus = (code: number): number => {
  switch (code) {
    case grpcStatus.INVALID_ARGUMENT:
      return 400;
    case grpcStatus.UNAUTHENTICATED:
      return 401;
    case grpcStatus.PERMISSION_DENIED:
      return 403;
    case grpcStatus.NOT_FOUND:
      return 404;
    case grpcStatus.ALREADY_EXISTS:
      return 409;
    case grpcStatus.FAILED_PRECONDITION:
      return 412;
    case grpcStatus.UNAVAILABLE:
      return 503;
    default:
      return 500;
  }
};

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface GrpcRouteDefinition {
  client: any; // gRPC client instance
  rpcMethod: string;
  endpoint: string;
  httpMethod: HttpMethod;
  transformRequest?: { fromJSON: (data: any) => any }; // Optional: DTO class with fromJSON
}

interface GrpcRoute {
  method: HttpMethod;
  endpoint: string;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}

const generateGrpcRoutes = (definitions: GrpcRouteDefinition[]): GrpcRoute[] => {
  return definitions.map(({ client, rpcMethod, endpoint, httpMethod, transformRequest }) => {
    const handler = async (req: Request, res: Response, next: NextFunction) => {
      try {
        let grpcRequest = null;
        if (req.body != null) {
          if (transformRequest == null) {
            throw new Error(`RPC transformer required for rpc method "${rpcMethod}".`);
          }
          grpcRequest = transformRequest.fromJSON(req.body);
        }

        const method = client[rpcMethod];
        if (method == null || typeof method !== 'function') {
          throw new Error(`RPC method "${rpcMethod}" not found on the client.`);
        }

        method.call(client, grpcRequest, (err: any, response: any) => {
          if (err != null) {
            const httpStatus = grpcToHttpStatus(err.code);
            return res.status(httpStatus).json({
              error: {
                code: httpStatus,
                message: err.details ?? null,
              },
            });
          }
          res.json(response);
        });
      } catch (error) {
        next(error);
      }
    };

    return {
      method: httpMethod,
      endpoint,
      handler,
    };
  });
};

export { generateGrpcRoutes };
