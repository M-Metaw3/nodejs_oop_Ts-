"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
function sendSuccessResponse(res, data, message, status) {
    if (message === void 0) { message = 'Success'; }
    if (status === void 0) { status = 200; }
    res.status(status).json({ success: true, message: message, data: data });
}
exports.sendSuccessResponse = sendSuccessResponse;
function sendErrorResponse(res, error, status) {
    if (status === void 0) { status = 500; }
    res.status(status).json({ success: false, error: error.message || 'Internal Server Error' });
}
exports.sendErrorResponse = sendErrorResponse;
