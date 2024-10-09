"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pino_1 = __importDefault(require("pino"));
var sanitized_env_1 = __importDefault(require("../../config/sanitized-env"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
// Ensure that the logs directory exists
var logDirectory = path_1.default.join(__dirname, '../../logs');
if (!fs_1.default.existsSync(logDirectory)) {
    fs_1.default.mkdirSync(logDirectory, { recursive: true });
}
var fileTransport = pino_1.default.transport({
    target: 'pino/file',
    options: { destination: "".concat(logDirectory, "/server.log") },
});
var logger = (0, pino_1.default)(__assign(__assign({ level: sanitized_env_1.default.LOG_LEVEL || 'info' }, (sanitized_env_1.default.NODE_ENV === 'development'
    ? {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                levelFirst: true,
            },
        },
    }
    : {})), { timestamp: function () { return ",\"timestamp\":\"".concat(new Date(Date.now()).toISOString(), "\""); } }), fileTransport);
exports.default = logger;
//# sourceMappingURL=logger.js.map