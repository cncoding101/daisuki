const STANDARD = {
  CREATED: 201,
  SUCCESS: 200,
  NOCONTENT: 204,
} as const;

const ERROR404 = {
  statusCode: 404,
  message: 'NOT_FOUND',
} as const;

const ERROR401 = {
  statusCode: 401,
  message: 'UNAUTHORIZED',
} as const;

const ERROR403 = {
  statusCode: 403,
  message: 'FORBIDDEN_ACCESS',
} as const;

const ERROR409 = {
  statusCode: 409,
  message: 'DUPLICATE_FOUND',
} as const;

const ERROR400 = {
  statusCode: 400,
  message: 'BAD_REQUEST',
} as const;

const ERROR422 = {
  statusCode: 422,
  message: 'UNPROCESSABLE_CONTENT',
} as const;

const ERROR500 = {
  statusCode: 500,
  message: 'TRY_AGAIN',
} as const;

export { STANDARD, ERROR400, ERROR401, ERROR403, ERROR404, ERROR422, ERROR409, ERROR500 };
