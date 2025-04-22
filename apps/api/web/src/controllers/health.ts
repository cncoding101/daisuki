import { TRPCError } from '@trpc/server';

const live = () => {
  return { message: 'Server is live' };
};

const ready = () => {
  const isReady = true;

  // anything you need to verify before confirming your application is ready
  // to start handling incoming requests.

  if (isReady) {
    return { message: 'Server is ready' };
  }

  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR', // TODO: change this into SERVICE_UNAVAILABLE when v11 of trpc is released
    message: 'Server is not ready yet',
  });
};

export { live, ready };
