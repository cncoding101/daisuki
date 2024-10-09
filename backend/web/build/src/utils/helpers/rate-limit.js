"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RATE_LIMIT = 20;
var INTERVAL = 60 * 1000;
var requestCounts = {};
setInterval(function () {
    Object.keys(requestCounts).forEach(function (ip) {
        requestCounts[ip] = 0;
    });
}, INTERVAL);
var rateLimitAndTimeout = function (req, res, next) {
    var ip = req.ip;
    requestCounts[ip] = (requestCounts[ip] || 0) + 1;
    if (requestCounts[ip] > RATE_LIMIT)
        return res.status(429).json({
            message: 'Rate limit exceeded.',
        });
    next();
};
exports.default = rateLimitAndTimeout;
//# sourceMappingURL=rate-limit.js.map