import { grpc } from '@monorepo/shared-lib';
import express from 'express';
import usersClient from '@/clients/grpc/user';
import { grpcToHttpStatus } from '@/utils/helpers/grpc';

const router = express.Router();

router.post('/create', (req, res, next) => {
  try {
    const grpcRequest = grpc.CreateUserRequestDto.fromJSON(req.body);

    usersClient.create(grpcRequest, (err, response) => {
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
  } catch (err) {
    next(err); // Will include parsing errors if malformed
  }
});

router.post('/signin', (req, res, next) => {
  usersClient.signIn(req.body, (err: Error | null, response: any) => {
    if (err != null) {
      return next(err);
    }
    res.json(response);
  });
});

export default router;
