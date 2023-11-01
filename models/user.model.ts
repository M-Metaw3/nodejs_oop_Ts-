// Import Sequelize from sequelize package
import { Sequelize } from "sequelize";

// Import bcrypt service from services folder
import { hashPassword } from "../services/bcrypt.service";

// Import user interface and model function from interfaces folder
import { User, userModel } from "../interfaces/user.interface";

// Import sequelize instance from config folder
import sequelize from "../config/db.config";

// Create the user model using the sequelize instance and the user model function
const User = userModel(sequelize);

// Define the associations for the user model
(User as any).associate = (models: any) => {
  // A user has many products
  User.hasMany(models.Product, {
    foreignKey: "userId",
    as: "products",
  });

  // A user has many user tokens
  User.hasMany(models.UserToken, {
    foreignKey: "userId",
    as: "tokens",
  });
};

// Define the hooks for the user model
User.addHook("beforeCreate", async (user: User) => {
  // Hash the password before creating a new user
  user.password = await hashPassword(user.password);
});

User.addHook("beforeUpdate", async (user: User) => {
  // Hash the password before updating an existing user
  if (user.changed("password")) {
    user.password = await hashPassword(user.password);
  }
});

// Export the user model for using in other files
export default User;
