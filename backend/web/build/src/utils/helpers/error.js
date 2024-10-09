"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotProcessableContent = exports.DuplicateFound = exports.NotAuthorizedError = exports.NotFoundError = exports.ValidationError = exports.DatabaseError = exports.AppError = void 0;
var status_code_1 = require("../../utils/constants/status-code");
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message, statusCode) {
        var _this = _super.call(this, message || status_code_1.ERROR500.message) || this;
        _this.name = _this.constructor.name;
        _this.statusCode = statusCode || status_code_1.ERROR500.statusCode;
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
var DatabaseError = /** @class */ (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError(message) {
        var _this = _super.call(this, message || status_code_1.ERROR422.message, status_code_1.ERROR422.statusCode) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return DatabaseError;
}(AppError));
exports.DatabaseError = DatabaseError;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message) {
        var _this = _super.call(this, message || status_code_1.ERROR400.message, status_code_1.ERROR400.statusCode) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return ValidationError;
}(AppError));
exports.ValidationError = ValidationError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        var _this = _super.call(this, message || status_code_1.ERROR404.message, status_code_1.ERROR404.statusCode) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return NotFoundError;
}(AppError));
exports.NotFoundError = NotFoundError;
var NotAuthorizedError = /** @class */ (function (_super) {
    __extends(NotAuthorizedError, _super);
    function NotAuthorizedError(message) {
        var _this = _super.call(this, message || status_code_1.ERROR401.message, status_code_1.ERROR401.statusCode) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return NotAuthorizedError;
}(AppError));
exports.NotAuthorizedError = NotAuthorizedError;
var DuplicateFound = /** @class */ (function (_super) {
    __extends(DuplicateFound, _super);
    function DuplicateFound(message) {
        var _this = _super.call(this, message || status_code_1.ERROR409.message, status_code_1.ERROR409.statusCode) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return DuplicateFound;
}(AppError));
exports.DuplicateFound = DuplicateFound;
var NotProcessableContent = /** @class */ (function (_super) {
    __extends(NotProcessableContent, _super);
    function NotProcessableContent(message) {
        var _this = _super.call(this, message || status_code_1.ERROR422.message, status_code_1.ERROR422.statusCode) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return NotProcessableContent;
}(AppError));
exports.NotProcessableContent = NotProcessableContent;
//# sourceMappingURL=error.js.map