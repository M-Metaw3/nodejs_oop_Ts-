
import * as bcrypt from 'bcrypt';  
import { Request, Response } from 'express';
import UserToken from '../models/user_token.model';

import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config';
import User from '../models/user.model';
import { UserAttributes } from '../interfaces/user.interface';
import { errorHandler } from '../middlewares/error.middleware';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      // Check if the user already exists
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser: UserAttributes = {
        username,
        email,
        password: hashedPassword,
      };
      
      const createdUser = await User.create(newUser);
      
      res.status(201).json(createdUser);
      
    } catch (error) {
      errorHandler(error, req, res); // Use error handling middleware
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Verify the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

      res.json({ token });
    } catch (error) {
      errorHandler(error, req, res); // Use error handling middleware
    }
  }

  static async logoutAllDevices(req: Request, res: Response) {
    try {
   

      const userId = req.userId; ; // Get the user ID from the authenticated request

      // Delete all tokens issued to the user
      const deletedRows = await UserToken.destroy({
        where: {
          userId,
        },
      });

      if (deletedRows > 0) {
        res.json({ message: 'Logged out from all devices' });
      } else {
        res.status(404).json({ message: 'No active sessions found' });
      }
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const userId = req.userId; // Get the user ID from the authenticated request

      // Delete the user token from the database
      const deletedRows = await UserToken.destroy({
        where: {
          userId,
          token: req.token, // The token sent with the request
        },
      });

      if (deletedRows > 0) {
        res.json({ message: 'Logged out successfully' });
      } else {
        res.status(404).json({ message: 'Token not found' });
      }
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}
