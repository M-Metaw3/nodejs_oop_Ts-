"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt = __importStar(require("bcrypt"));
const user_token_model_1 = __importDefault(require("../models/user_token.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
const user_model_1 = __importDefault(require("../models/user.model"));
const error_middleware_1 = require("../middlewares/error.middleware");
class AuthController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            // Check if the user already exists
            const user = await user_model_1.default.findOne({ where: { email } });
            if (user) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user
            const newUser = {
                username,
                email,
                password: hashedPassword,
            };
            const createdUser = await user_model_1.default.create(newUser);
            res.status(201).json(createdUser);
        }
        catch (error) {
            (0, error_middleware_1.errorHandler)(error, req, res); // Use error handling middleware
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            // Check if the user exists
            const user = await user_model_1.default.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            // Verify the password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwt_config_1.default.secret, { expiresIn: jwt_config_1.default.expiresIn });
            res.json({ token });
        }
        catch (error) {
            (0, error_middleware_1.errorHandler)(error, req, res); // Use error handling middleware
        }
    }
    static async logoutAllDevices(req, res) {
        try {
            const userId = req.userId;
            ; // Get the user ID from the authenticated request
            // Delete all tokens issued to the user
            const deletedRows = await user_token_model_1.default.destroy({
                where: {
                    userId,
                },
            });
            if (deletedRows > 0) {
                res.json({ message: 'Logged out from all devices' });
            }
            else {
                res.status(404).json({ message: 'No active sessions found' });
            }
        }
        catch (error) {
            (0, error_middleware_1.errorHandler)(error, req, res);
        }
    }
    static async logout(req, res) {
        try {
            const userId = req.userId; // Get the user ID from the authenticated request
            // Delete the user token from the database
            const deletedRows = await user_token_model_1.default.destroy({
                where: {
                    userId,
                    token: req.token, // The token sent with the request
                },
            });
            if (deletedRows > 0) {
                res.json({ message: 'Logged out successfully' });
            }
            else {
                res.status(404).json({ message: 'Token not found' });
            }
        }
        catch (error) {
            (0, error_middleware_1.errorHandler)(error, req, res);
        }
    }
}
exports.AuthController = AuthController;
