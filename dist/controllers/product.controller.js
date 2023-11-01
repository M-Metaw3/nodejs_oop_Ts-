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
exports.ProductController = void 0;
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const error_middleware_1 = require("../middlewares/error.middleware");
const response_util_1 = require("../utils/response.util");
const sharp_service_1 = __importDefault(require("../services/sharp.service"));
const product_model_1 = __importDefault(require("../models/product.model"));
const multer = __importStar(require("multer"));
// Configure multer for file uploads
const upload = multer({ dest: 'src/uploads/' });
class ProductController {
    static async createProduct(req, res) {
        try {
            const { name, description, price } = req.body;
            const { file } = req; // Uploaded image file
            // Check if a file was provided
            if (!file) {
                return response_util_1.ResponseUtil.badRequest(res, 'Image file is required');
            }
            // Resize and store the image
            const resizedImageBuffer = await sharp_service_1.default.resizeImage(file.buffer, 300, 300, 'jpeg');
            const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
            const imagePath = path.join('src/uploads', uniqueFileName);
            fs_1.default.writeFileSync(imagePath, resizedImageBuffer);
            const newProduct = {
                name,
                description,
                price,
                image: uniqueFileName,
                ownerId: req.userId, // Associate the product with the logged-in user
            };
            const createdProduct = await product_model_1.default.create(newProduct);
            res.status(201).json(createdProduct);
        }
        catch (error) {
            (0, error_middleware_1.errorHandler)(error, req, res);
        }
    }
    static async updateProduct(req, res) {
        try {
            const { name, description, price } = req.body;
            const { id } = req.params;
            const { file } = req; // Uploaded image file
            // Find the existing product
            const existingProduct = await product_model_1.default.findByPk(id);
            if (!existingProduct) {
                return response_util_1.ResponseUtil.notFound(res, 'Product not found');
            }
            // Check if the logged-in user owns the product
            if (existingProduct.ownerId !== req.userId) {
                return response_util_1.ResponseUtil.forbidden(res, 'You do not have permission to update this product');
            }
            // Check if a new image was provided
            if (file) {
                // Remove the old image if it exists
                if (existingProduct.image) {
                    const oldImagePath = path.join('src/uploads', existingProduct.image);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                // Resize and store the new image
                const resizedImageBuffer = await sharp_service_1.default.resizeImage(file.buffer, 300, 300, 'jpeg');
                const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
                const imagePath = path.join('src/uploads', uniqueFileName);
                fs_1.default.writeFileSync(imagePath, resizedImageBuffer);
                // Update the product with the new image
                existingProduct.image = uniqueFileName;
            }
            // Update other product properties
            existingProduct.name = name;
            existingProduct.description = description;
            existingProduct.price = price;
            await existingProduct.save();
            res.json(existingProduct);
        }
        catch (error) {
            (0, error_middleware_1.errorHandler)(error, req, res);
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const existingProduct = await product_model_1.default.findByPk(id);
            if (!existingProduct) {
                return response_util_1.ResponseUtil.notFound(res, 'Product not found');
            }
            // Check if the logged-in user owns the product
            if (existingProduct.ownerId !== req.userId) {
                return response_util_1.ResponseUtil.forbidden(res, 'You do not have permission to delete this product');
            }
            // Check if an image exists and delete it
            if (existingProduct.image) {
                const imagePath = path.join('src/uploads', existingProduct.image);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            await existingProduct.destroy();
            response_util_1.ResponseUtil.successNoContent(res);
        }
        catch (error) {
            (0, error_middleware_1.errorHandler)(error, req, res);
        }
    }
    static async getAllProducts(req, res) {
        try {
            const products = await product_model_1.default.findAll({
                where: { userid: req.userId }, // Only fetch products owned by the logged-in user
            });
            res.json(products);
        }
        catch (error) {
            (0, error_middleware_1.errorHandler)(error, req, res);
        }
    }
}
exports.ProductController = ProductController;
