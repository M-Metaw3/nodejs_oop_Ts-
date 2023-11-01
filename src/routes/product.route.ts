import express, { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const productRouter: Router = express.Router();

// Create a new product
productRouter.post('/create', authenticateToken, ProductController.createProduct);

// Get a list of products
productRouter.get('/list', ProductController.listProducts);

// Get product details by ID
productRouter.get('/:id', ProductController.getProductById);

// Update a product by ID
productRouter.put('/:id/update', authenticateToken, ProductController.updateProduct);

// Delete a product by ID
productRouter.delete('/:id/delete', authenticateToken, ProductController.deleteProduct);

// Search for products by name
productRouter.get('/search', ProductController.searchProducts);

export default productRouter;
