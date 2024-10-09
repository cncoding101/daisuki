"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR500 = exports.ERROR409 = exports.ERROR422 = exports.ERROR404 = exports.ERROR403 = exports.ERROR401 = exports.ERROR400 = exports.STANDARD = void 0;
var STANDARD = {
    CREATED: 201,
    SUCCESS: 200,
    NOCONTENT: 204,
};
exports.STANDARD = STANDARD;
var ERROR404 = {
    statusCode: 404,
    message: 'NOT_FOUND',
};
exports.ERROR404 = ERROR404;
var ERROR401 = {
    statusCode: 401,
    message: 'UNAUTHORIZED',
};
exports.ERROR401 = ERROR401;
var ERROR403 = {
    statusCode: 403,
    message: 'FORBIDDEN_ACCESS',
};
exports.ERROR403 = ERROR403;
var ERROR409 = {
    statusCode: 409,
    message: 'DUPLICATE_FOUND',
};
exports.ERROR409 = ERROR409;
var ERROR400 = {
    statusCode: 400,
    message: 'BAD_REQUEST',
};
exports.ERROR400 = ERROR400;
var ERROR422 = {
    statusCode: 422,
    message: 'UNPROCESSABLE_CONTENT',
};
exports.ERROR422 = ERROR422;
var ERROR500 = {
    statusCode: 500,
    message: 'TRY_AGAIN',
};
exports.ERROR500 = ERROR500;
//# sourceMappingURL=status-code.js.map