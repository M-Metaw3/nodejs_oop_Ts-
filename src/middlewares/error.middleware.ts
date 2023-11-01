import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response)=> {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
};
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
};