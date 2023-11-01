import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import { UserTokenAttributes } from '../interfaces/user_token.interface';

class UserToken extends Model<UserTokenAttributes> {
  public id!: number;
  public userId!: number;
  public token!: string;
  public refreshToken!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE, // Add this line
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE, // Add this line
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_tokens',
  }
);

export default UserToken;
