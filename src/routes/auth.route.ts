import * as express from 'express';
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const authRouter: Router =express.Router();

// Register a new user
authRouter.post('/register', AuthController.register);

// Login and generate a JWT token
authRouter.post('/login', AuthController.login);

// Logout from the current session
authRouter.post('/logout', authenticateToken, AuthController.logout);

// Logout from all devices
authRouter.post('/logout/all', authenticateToken,  AuthController.logoutAllDevices);

export default authRouter;
