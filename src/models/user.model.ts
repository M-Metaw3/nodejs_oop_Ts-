import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import { UserAttributes } from '../interfaces/user.interface';

class User extends Model<UserAttributes> {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  // Add any other fields you need for the User model.

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
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
    // Define other fields here.
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
