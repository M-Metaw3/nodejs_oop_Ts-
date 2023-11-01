import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import { ProductAttributes } from '../interfaces/product.interface';

class Product extends Model<ProductAttributes> {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public image!: string;
  // Add any other fields you need for the Product model.

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Define other fields here.
  },
  {
    sequelize,
    tableName: 'products',
  }
);

export default Product;
