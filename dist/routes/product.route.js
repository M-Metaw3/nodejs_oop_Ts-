"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const productRouter = express_1.default.Router();
// Create a new product
productRouter.post('/create', auth_middleware_1.authenticateToken, product_controller_1.ProductController.createProduct);
// Get a list of products
productRouter.get('/list', product_controller_1.ProductController.listProducts);
// Get product details by ID
productRouter.get('/:id', product_controller_1.ProductController.getProductById);
// Update a product by ID
productRouter.put('/:id/update', auth_middleware_1.authenticateToken, product_controller_1.ProductController.updateProduct);
// Delete a product by ID
productRouter.delete('/:id/delete', auth_middleware_1.authenticateToken, product_controller_1.ProductController.deleteProduct);
// Search for products by name
productRouter.get('/search', product_controller_1.ProductController.searchProducts);
exports.default = productRouter;
