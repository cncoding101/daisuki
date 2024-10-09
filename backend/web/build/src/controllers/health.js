"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.live = void 0;
var live = function (req, res) {
    return res.status(200).json({ message: 'Server is live' });
};
exports.live = live;
var ready = function (req, res) {
    var isReady = false;
    // anything you need to verify before confirming your application is ready
    // to start handling incoming requests.
    if (isReady) {
        return res.status(200).json({ message: 'Server is ready' });
    }
    return res.status(503).json({
        code: 503,
        message: 'Server is not ready yet',
    });
};
exports.ready = ready;
//# sourceMappingURL=health.js.map