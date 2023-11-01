import Product from "../models/product.model";
import { validateProduct } from "../services/joi.service";
import resizeImage from "../services/sharp.service";
import { cacheData, getData, invalidateData } from "../services/redis.service";
import responseFormat from "../utils/response.util";
import paginate from "../utils/pagination.util";

// Define the create product function that takes a request and a response as input and creates a new product in the database
const createProduct = async (req: any, res: any) => {
  try {
    const productInput = req.body;
    const product = validateProduct(productInput);
    const userId = req.userId;
    product.userId = userId;

    const newProduct = await Product.create(product);

    await invalidateData("products");

    res.status(201).send(responseFormat(201, "Product created successfully", newProduct));
  } catch (error) {
    res.status(500).send(responseFormat(500, "Failed to create product", error.message));
  }
};

// Define the get products function that takes a request and a response as input and retrieves all products from the database
const getProducts = async (req: any, res: any) => {
  try {
    const cachedData = await getData("products");
    if (cachedData) {
      return res.status(200).send(responseFormat(200, "Products retrieved successfully", cachedData));
    }

    const products = await Product.findAll();
    await cacheData("products", products);

    res.status(200).send(responseFormat(200, "Products retrieved successfully", products));
  } catch (error) {
    res.status(500).send(responseFormat(500, "Failed to retrieve products", error.message));
  }
};

// Define the update product function that takes a request and a response as input and updates an existing product in the database
const updateProduct = async (req: any, res: any) => {
  try {
    const productId = req.params.id;
    const productInput = req.body;
    const product = validateProduct(productInput);

    const existingProduct = await Product.findByPk(productId);
    if (!existingProduct) {
      return res.status(404).send(responseFormat(404, "Product not found"));
    }

    const updatedProduct = await existingProduct.update(product);

    await invalidateData("products");

    res.status(200).send(responseFormat(200, "Product updated successfully", updatedProduct));
  } catch (error) {
    res.status(500).send(responseFormat(500, "Failed to update product", error.message));
  }
};

// Define the delete product function that takes a request and a response as input and deletes an existing product from the database
const deleteProduct = async (req: any, res: any) => {
  try {
    const productId = req.params.id;

    const existingProduct = await Product.findByPk(productId);
    if (!existingProduct) {
      return res.status(404).send(responseFormat(404, "Product not found"));
    }

    await existingProduct.destroy();

    await invalidateData("products");

    res.status(200).send(responseFormat(200, "Product deleted successfully"));
  } catch (error) {
    res.status(500).send(responseFormat(500, "Failed to delete product", error.message));
  }
};

// Define the search product function that takes a request and a response as input and searches for products in the database
const searchProduct = async (req: any, res: any) => {
  try {
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { offset, totalPages } = paginate(page, limit);

    const products = await Product.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      offset,
      limit,
    });

    res.status(200).send(responseFormat(200, "Products retrieved successfully", { products, totalPages }));
  } catch (error) {
    res.status(500).send(responseFormat(500, "Failed to search products", error.message));
  }
};

export {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};