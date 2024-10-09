"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
var login_1 = __importDefault(require("../../business/auth/login"));
exports.login = login_1.default;
var register_1 = __importDefault(require("../../business/auth/register"));
exports.register = register_1.default;
//# sourceMappingURL=index.js.map