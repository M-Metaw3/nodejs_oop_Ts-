"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = __importDefault(require("../config/jwt.config")); // Update this line
const user_token_model_1 = __importDefault(require("../models/user_token.model"));
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, jwt_config_1.default.secret);
        // Check if the token exists in the database
        const userToken = await user_token_model_1.default.findOne({
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
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
