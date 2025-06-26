import { credentials } from '@grpc/grpc-js';
import { grpc } from '@monorepo/shared-lib';

const client = new grpc.UserServiceClient('localhost:5001', credentials.createInsecure());

export default client;
