import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config'; // Update this line
import UserToken from '../models/user_token.model';

// Define a custom interface to extend the Request object
interface AuthRequest extends Request {
  userId: number; // Add the custom property
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decodedToken = jwt.verify(token, jwtConfig.secret) as { userId: number };

    // Check if the token exists in the database
    const userToken = await UserToken.findOne({
      where: {
        userId: decodedToken.userId,
        token,
      },
    });

    if (!userToken) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // The token is valid, and you can attach the user ID to the request
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
