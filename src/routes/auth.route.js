"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var authRouter = express.Router();
// Register a new user
authRouter.post('/register', auth_controller_1.AuthController.register);
// Login and generate a JWT token
authRouter.post('/login', auth_controller_1.AuthController.login);
// Logout from the current session
authRouter.post('/logout', auth_middleware_1.authenticateToken, auth_controller_1.AuthController.logout);
// Logout from all devices
authRouter.post('/logout/all', auth_middleware_1.authenticateToken, auth_controller_1.AuthController.logoutAllDevices);
exports.default = authRouter;
