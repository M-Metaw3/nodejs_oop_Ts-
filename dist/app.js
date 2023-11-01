"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("./config/db.config"));
const express_1 = __importDefault(require("express"));
// import * as morgan from 'morgan';
// import * as cors from 'cors';
const body_parser_1 = require("body-parser");
const auth_route_1 = __importDefault(require("./routes/auth.route")); // Import your auth routes
// import productRouter from './routes/product.route'; // Import your product routes
const app = (0, express_1.default)();
// Middleware
// app.use(cors());
// app.use(morgan('dev'));
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
// Define your routes
app.use('/auth', auth_route_1.default); // Mount auth routes under '/auth'
// app.use('/products', productRouter); // Mount product routes under '/products'
exports.default = app;
db_config_1.default
    .authenticate()
    .then(() => {
    console.log("Database connection has been established successfully.");
})
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
});
console.log("metaweaa");
