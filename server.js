"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./src/app")); // Import your Express app
const PORT = process.env.PORT || 3000; // Set the port from environment variables or default to 3000
const server = http_1.default.createServer(app_1.default);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
