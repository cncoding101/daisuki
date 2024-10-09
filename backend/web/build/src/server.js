"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var compression_1 = __importDefault(require("compression"));
var helmet_1 = __importDefault(require("helmet"));
var path_1 = __importDefault(require("path"));
var pino_http_1 = __importDefault(require("pino-http"));
var body_parser_1 = __importDefault(require("body-parser"));
var yamljs_1 = __importDefault(require("yamljs"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var OpenApiValidator = __importStar(require("express-openapi-validator"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var sanitized_env_1 = __importDefault(require("./config/sanitized-env"));
var logger_1 = __importDefault(require("./utils/helpers/logger"));
var rate_limit_1 = __importDefault(require("./utils/helpers/rate-limit"));
var global_error_handler_1 = __importDefault(require("./middlewares/global-error-handler"));
var status_code_1 = require("./utils/constants/status-code");
var PORT = sanitized_env_1.default.PORT || 5000;
var services = [
// {
//   route: '/users',
//   target: '',
// },
// {
//   route: '/orders',
//   target: '',
// },
// {
//   route: '/payments',
//   target: '',
// },
// {
//   route: '/products',
//   target: '',
// },
];
var swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, 'swagger', 'api.yaml'));
var buildServer = function () {
    var app = (0, express_1.default)();
    // middlwares
    app.use((0, cors_1.default)());
    app.use((0, compression_1.default)());
    app.use((0, helmet_1.default)()); // add security headers
    app.disable('x-powered-by'); // hide express server info
    app.use((0, pino_http_1.default)({ logger: logger_1.default }));
    // parses incoming req to body
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json({ limit: '1MB' }));
    // rate limiting
    app.use(rate_limit_1.default);
    app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    // setup open api validation
    app.use(OpenApiValidator.middleware({
        apiSpec: path_1.default.join(__dirname, 'swagger', 'api.yaml'),
        operationHandlers: path_1.default.join(__dirname, 'controllers'),
    }));
    // setup proxy to microservices
    services.forEach(function (_a) {
        var _b;
        var route = _a.route, target = _a.target;
        var proxyOptions = {
            target: target,
            changeOrigin: true,
            pathRewrite: (_b = {},
                _b["^".concat(route)] = '',
                _b),
        };
        app.use(route, rate_limit_1.default, (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions));
    });
    // TODO add authentication
    // TODO add cache layer using redis
    // TODO add swagger ui with auto generated routes from controllers
    app.use('*', function (_, res) {
        res.status(404).json(status_code_1.ERROR404);
    });
    app.use(global_error_handler_1.default);
    return app;
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        try {
            app = buildServer();
            app.listen(PORT, function () {
                console.log("Server i running on port ".concat(PORT));
            });
            // // Graceful shutdown function
            // const gracefulShutdown = (signal: string) => {
            //   logger.info(`Received ${signal}. Shutting down gracefully...`);
            //   server.close(() => {
            //     logger.info('Closed out remaining connections');
            //     process.exit(0);
            //   });
            //   setTimeout(() => {
            //     logger.fatal('Could not close connections in time, forcefully shutting down');
            //     process.abort(); // exit immediately and generate a core dump file
            //   }, 1000).unref();
            //   process.exit(1);
            //   // Optional: Close other resources like database connections, etc.
            // };
            // // Listen for termination signals
            // process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
            // process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        }
        catch (err) {
            logger_1.default.fatal(err);
            process.exit(1);
        }
        return [2 /*return*/];
    });
}); };
// used to indicate if the script should be ran directly or not
if (require.main === module)
    main();
// for testing purposes
exports.default = buildServer;
//# sourceMappingURL=server.js.map