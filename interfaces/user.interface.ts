
// Import Sequelize from sequelize package
import { Sequelize, Model, DataTypes } from "sequelize";

// Define the user interface that extends the model interface
interface User extends Model {
  id: number; // The id of the user
  name: string; // The name of the user
  email: string; // The email of the user
  password: string; // The password of the user
  role: string; // The role of the user
  createdAt: Date; // The date when the user was created
  updatedAt: Date; // The date when the user was updated
}

// Define the user model function that takes a sequelize instance as input and returns a user model as output
const userModel = (sequelize: Sequelize) => {
  // Define the user model using sequelize with some attributes and options
  const User = sequelize.define<User>(
    "User",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  // Return the user model
  return User;
};

// Export the user interface and model function for using in other files
export { User, userModel };
