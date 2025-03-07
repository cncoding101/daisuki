import { Request, Response } from 'express';
import { AppError } from '@/utils/helpers/error';
import logger from '@/utils/helpers/logger';

type ErrorResponse = {
  statusCode: number;
  timeStamp: string;
  path: string;
  message: string | object;
  stack?: string | object;
};

export default (error: Error, req: Request, res: Response) => {
  logger.error(error);

  const errorResponse: ErrorResponse = {
    statusCode: 500,
    timeStamp: new Date().toISOString(),
    path: req.url,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : {},
  };

  if (error instanceof AppError) errorResponse.statusCode = error.statusCode;
  return res.status(errorResponse.statusCode).json(errorResponse);
};
