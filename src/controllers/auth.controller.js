"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var bcrypt = require("bcrypt");
var user_token_model_1 = require("../models/user_token.model");
var jsonwebtoken_1 = require("jsonwebtoken");
var jwt_config_1 = require("../config/jwt.config");
var user_model_1 = require("../models/user.model");
var error_middleware_1 = require("../middlewares/error.middleware");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, email, password, user, hashedPassword, newUser, createdUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                        return [4 /*yield*/, user_model_1.default.findOne({ where: { email: email } })];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            return [2 /*return*/, res.status(400).json({ message: 'User with this email already exists' })];
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 2:
                        hashedPassword = _b.sent();
                        newUser = {
                            username: username,
                            email: email,
                            password: hashedPassword,
                        };
                        return [4 /*yield*/, user_model_1.default.create(newUser)];
                    case 3:
                        createdUser = _b.sent();
                        res.status(201).json(createdUser);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        (0, error_middleware_1.errorHandler)(error_1, req, res); // Use error handling middleware
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, passwordMatch, token, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, user_model_1.default.findOne({ where: { email: email } })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).json({ message: 'Invalid email or password' })];
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        passwordMatch = _b.sent();
                        if (!passwordMatch) {
                            return [2 /*return*/, res.status(401).json({ message: 'Invalid email or password' })];
                        }
                        token = jsonwebtoken_1.default.sign({ userId: user.id }, jwt_config_1.default.secret, { expiresIn: jwt_config_1.default.expiresIn });
                        res.json({ token: token });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        (0, error_middleware_1.errorHandler)(error_2, req, res); // Use error handling middleware
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.logoutAllDevices = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, deletedRows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.userId;
                        ; // Get the user ID from the authenticated request
                        return [4 /*yield*/, user_token_model_1.default.destroy({
                                where: {
                                    userId: userId,
                                },
                            })];
                    case 1:
                        deletedRows = _a.sent();
                        if (deletedRows > 0) {
                            res.json({ message: 'Logged out from all devices' });
                        }
                        else {
                            res.status(404).json({ message: 'No active sessions found' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        (0, error_middleware_1.errorHandler)(error_3, req, res);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, deletedRows, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.userId;
                        return [4 /*yield*/, user_token_model_1.default.destroy({
                                where: {
                                    userId: userId,
                                    token: req.token, // The token sent with the request
                                },
                            })];
                    case 1:
                        deletedRows = _a.sent();
                        if (deletedRows > 0) {
                            res.json({ message: 'Logged out successfully' });
                        }
                        else {
                            res.status(404).json({ message: 'Token not found' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        (0, error_middleware_1.errorHandler)(error_4, req, res);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
