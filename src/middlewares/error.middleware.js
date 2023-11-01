"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
var errorHandler = function (err, req, res) {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
var notFoundHandler = function (req, res) {
    res.status(404).json({ message: 'Route not found' });
};
exports.notFoundHandler = notFoundHandler;
