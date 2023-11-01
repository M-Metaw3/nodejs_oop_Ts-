"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
function sendSuccessResponse(res, data, message = 'Success', status = 200) {
    res.status(status).json({ success: true, message, data });
}
exports.sendSuccessResponse = sendSuccessResponse;
function sendErrorResponse(res, error, status = 500) {
    res.status(status).json({ success: false, error: error.message || 'Internal Server Error' });
}
exports.sendErrorResponse = sendErrorResponse;
