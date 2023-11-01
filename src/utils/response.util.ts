import { Response } from 'express';

function sendSuccessResponse(res: Response, data: any, message: string = 'Success', status: number = 200) {
  res.status(status).json({ success: true, message, data });
}

function sendErrorResponse(res: Response, error: any, status: number = 500) {
  res.status(status).json({ success: false, error: error.message || 'Internal Server Error' });
}

export { sendSuccessResponse, sendErrorResponse };
