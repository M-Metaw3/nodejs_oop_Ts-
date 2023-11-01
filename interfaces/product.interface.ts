// Import Sequelize from sequelize package
import { Sequelize, Model, DataTypes } from "sequelize";

// Define the product interface that extends the model interface
interface Product extends Model {
  id: number; // The id of the product
  name: string; // The name of the product
  description: string; // The description of the product
  price: number; // The price of the product
  image: string; // The image of the product
  userId: number; // The id of the user who created the product
  createdAt: Date; // The date when the product was created
  updatedAt: Date; // The date when the product was updated
}

// Define the product model function that takes a sequelize instance as input and returns a product model as output
const productModel = (sequelize: Sequelize) => {
  // Define the product model using sequelize with some attributes and options
  const Product = sequelize.define<Product>(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );

  // Return the product model
  return Product;
};

// Export the product interface and model function for using in other files
export { Product, productModel };