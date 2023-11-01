import { Request, Response } from 'express';
import fs from 'fs';
import  * as path from 'path';
import { ProductAttributes } from '../interfaces/product.interface';
import { errorHandler } from '../middlewares/error.middleware';
import { PaginationUtil } from '../utils/pagination.util';
import { ResponseUtil } from '../utils/response.util';
import  SharpService  from '../services/sharp.service';
import Product from '../models/product.model';
import * as multer from 'multer';

// Configure multer for file uploads
const upload = multer({ dest: 'src/uploads/' });

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;
      const { file } = req; // Uploaded image file

      // Check if a file was provided
      if (!file) {
        return ResponseUtil.badRequest(res, 'Image file is required');
      }

      // Resize and store the image
      const resizedImageBuffer = await SharpService.resizeImage(file.buffer, 300, 300, 'jpeg');
      const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
      const imagePath = path.join('src/uploads', uniqueFileName);

      fs.writeFileSync(imagePath, resizedImageBuffer);

      const newProduct: ProductAttributes = {
        name,
        description,
        price,
        image: uniqueFileName, // Store the unique image file name
        ownerId: req.userId, // Associate the product with the logged-in user
      };

      const createdProduct = await Product.create(newProduct);

      res.status(201).json(createdProduct);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;
      const { id } = req.params;
      const { file } = req; // Uploaded image file

      // Find the existing product
      const existingProduct = await Product.findByPk(id);

      if (!existingProduct) {
        return ResponseUtil.notFound(res, 'Product not found');
      }

      // Check if the logged-in user owns the product
      if (existingProduct.ownerId !== req.userId) {
        return ResponseUtil.forbidden(res, 'You do not have permission to update this product');
      }

      // Check if a new image was provided
      if (file) {
        // Remove the old image if it exists
        if (existingProduct.image) {
          const oldImagePath = path.join('src/uploads', existingProduct.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        // Resize and store the new image
        const resizedImageBuffer = await SharpService.resizeImage(file.buffer, 300, 300, 'jpeg');
        const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
        const imagePath = path.join('src/uploads', uniqueFileName);

        fs.writeFileSync(imagePath, resizedImageBuffer);

        // Update the product with the new image
        existingProduct.image = uniqueFileName;
      }

      // Update other product properties
      existingProduct.name = name;
      existingProduct.description = description;
      existingProduct.price = price;

      await existingProduct.save();

      res.json(existingProduct);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingProduct = await Product.findByPk(id);

      if (!existingProduct) {
        return ResponseUtil.notFound(res, 'Product not found');
      }

      // Check if the logged-in user owns the product
      if (existingProduct.ownerId !== req.userId) {
        return ResponseUtil.forbidden(res, 'You do not have permission to delete this product');
      }

      // Check if an image exists and delete it
      if (existingProduct.image) {
        const imagePath = path.join('src/uploads', existingProduct.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await existingProduct.destroy();

      ResponseUtil.successNoContent(res);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await Product.findAll({
        where: { userid: req.userId }, // Only fetch products owned by the logged-in user
      });

      res.json(products);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}
