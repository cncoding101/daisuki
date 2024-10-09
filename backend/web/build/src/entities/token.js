"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (function (_a) {
    var email = _a.email, secret = _a.secret, _b = _a.expiresIn, expiresIn = _b === void 0 ? '15m' : _b;
    var token = jsonwebtoken_1.default.sign({ email: email }, secret, { expiresIn: expiresIn });
    return Object.freeze(token);
});
//# sourceMappingURL=token.js.map