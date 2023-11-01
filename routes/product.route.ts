// Import express from express package
import express from "express";

// Import product controller from controllers folder
import { createProduct, getProducts, updateProduct, deleteProduct, searchProduct } from "../controllers/product.controller";

// Import auth middleware from middlewares folder
import { verifyToken, checkUserRole, checkUserOwnership } from "../middlewares/auth.middleware";

// Import multer instance from config folder
import upload from "../config/multer.config";

// Create an express router instance
const router = express.Router();

// Define the create product route that takes a post request and calls the createProduct function from product controller with verifyToken and upload middleware
router.post("/products/create", verifyToken, upload.single("image"), createProduct);

// Define the get products route that takes a get request and calls the getProducts function from product controller with verifyToken middleware
router.get("/products", verifyToken, getProducts);

// Define the update product route that takes a put request and calls the updateProduct function from product controller with verifyToken, checkUserOwnership and upload middleware
router.put("/products/:id/update", verifyToken, checkUserOwnership, upload.single("image"), updateProduct);

// Define the delete product route that takes a delete request and calls the deleteProduct function from product controller with verifyToken, checkUserOwnership middleware
router.delete("/products/:id/delete", verifyToken, checkUserOwnership, deleteProduct);

// Define the search product route that takes a get request and calls the searchProduct function from product controller with verifyToken middleware
router.get("/products/search", verifyToken, searchProduct);

// Export the router for using in other files
export default router;
