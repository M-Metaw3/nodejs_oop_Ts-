// Import express from express package
import express from "express";

// Import auth controller from controllers folder
import { register, login, logout, refreshToken } from "../controllers/auth.controller";

// Import auth middleware from middlewares folder
import { verifyToken } from "../middlewares/auth.middleware";

// Create an express router instance
const router = express.Router();

// Define the register route that takes a post request and calls the register function from auth controller
router.post("/register", register);

// Define the login route that takes a post request and calls the login function from auth controller
router.post("/login", login);

// Define the logout route that takes a post request and calls the logout function from auth controller with verifyToken middleware
router.post("/logout", verifyToken, logout);

// Define the refresh-token route that takes a post request and calls the refresh-token function from auth controller with verifyToken middleware
router.post("/refresh-token", verifyToken, refreshToken);

// Export the router for using in other files
export default router;
