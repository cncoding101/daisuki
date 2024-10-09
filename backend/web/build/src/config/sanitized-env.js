"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var ajv_1 = __importDefault(require("ajv"));
var env_schema_1 = __importDefault(require("env-schema"));
var logger_1 = require("../utils/enums/logger");
var environment_1 = require("../utils/enums/environment");
var ajv = new ajv_1.default({
    allErrors: true,
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    allowUnionTypes: true,
});
var schema = {
    type: 'object',
    properties: {
        PORT: { type: 'number' },
        LOG_LEVEL: { type: 'string', enum: Object.values(logger_1.LogLevel) },
        NODE_ENV: { type: 'string', enum: Object.values(environment_1.NodeEnv) },
    },
};
var config = (0, env_schema_1.default)({
    schema: schema,
    dotenv: true,
    ajv: ajv,
});
exports.default = config;
//# sourceMappingURL=sanitized-env.js.map