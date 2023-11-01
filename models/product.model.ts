// Import Sequelize from sequelize package
import { Sequelize } from "sequelize";

// Import sharp service from services folder
import resizeImage from "../services/sharp.service";

// Import product interface and model function from interfaces folder
import { Product, productModel } from "../interfaces/product.interface";

// Import sequelize instance from config folder
import sequelize from "../config/db.config";

// Create the product model using the sequelize instance and the product model function
const Product = productModel(sequelize);

// Define the associations for the product model
(Product as any).associate = (models: any) => {
    // A product belongs to a user
    Product.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

// Define the hooks for the product model
Product.addHook("beforeCreate", async (product: Product) => {
    // Resize and optimize the image before creating a new product
    const imageBuffer = await resizeImage(Buffer.from(product.image, "base64"));
    product.image = imageBuffer.toString("base64");
  });

  Product.addHook("beforeUpdate", async (product: Product) => {
    // Resize and optimize the image before updating an existing product
    if (product.changed("image")) {
      const imageBuffer = await resizeImage(Buffer.from(product.image, "base64"));
      product.image = imageBuffer.toString("base64");
    }
  });

// Export the product model for using in other files
export default Product;
