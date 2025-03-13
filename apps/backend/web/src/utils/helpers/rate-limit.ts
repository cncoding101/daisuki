import { Request, Response, NextFunction } from 'express';

const RATE_LIMIT = 20;
const INTERVAL = 60 * 1000;

const requestCounts: Record<string, number> = {};

setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0;
  });
}, INTERVAL);

const rateLimitAndTimeout = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip!;

  requestCounts[ip] = (requestCounts[ip] ?? 0) + 1;

  if (requestCounts[ip] > RATE_LIMIT) {
    res.status(429).json({
      message: 'Rate limit exceeded.',
    });
    return;
  }

  next();
};

export default rateLimitAndTimeout;
