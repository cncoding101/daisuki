import { ControllerByOperationId } from 'src/controller';

const live: ControllerByOperationId<'live'> = (req, res) => {
  return res.status(200).json({ message: 'Server is live' });
};

const ready: ControllerByOperationId<'ready'> = (req, res) => {
  const isReady = false;

  // anything you need to verify before confirming your application is ready
  // to start handling incoming requests.

  if (isReady) {
    return res.status(200).json({ message: 'Server is ready' });
  }

  return res.status(503).json({
    code: 503,
    message: 'Server is not ready yet',
  });
};

export { live, ready };
