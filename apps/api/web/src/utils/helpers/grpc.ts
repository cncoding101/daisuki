import { status as grpcStatus } from '@grpc/grpc-js';

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

export { grpcToHttpStatus };
