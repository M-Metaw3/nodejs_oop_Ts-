// Import Sequelize from sequelize package
import { Sequelize, Model, DataTypes } from "sequelize";

// Define the user_token interface that extends the model interface
interface UserToken extends Model {
  id: number; // The id of the user token
  userId: number; // The id of the user who owns the token
  token: string; // The token value
}

// Define the user_token model function that takes a sequelize instance as input and returns a user_token model as output
const userTokenModel = (sequelize: Sequelize) => {
  // Define the user_token model using sequelize with some attributes and options
  const UserToken = sequelize.define<UserToken>(
    "UserToken",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "user_tokens",
      timestamps: false,
    }
  );

  // Return the user_token model
  return UserToken;
};

// Export the user_token interface and model function for using in other files
export  { UserToken, userTokenModel };
