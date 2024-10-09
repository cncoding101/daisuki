"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../utils/helpers/logger"));
var error_1 = require("../utils/helpers/error");
exports.default = (function (error, req, res) {
    logger_1.default.error(error);
    var errorResponse = {
        statusCode: 500,
        timeStamp: new Date().toISOString(),
        path: req.url,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : {},
    };
    if (error instanceof error_1.AppError)
        errorResponse.statusCode = error.statusCode;
    return res.status(errorResponse.statusCode).json(errorResponse);
});
//# sourceMappingURL=global-error-handler.js.map