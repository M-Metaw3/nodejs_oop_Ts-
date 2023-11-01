"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import Sequelize from sequelize package
const sequelize_1 = require("sequelize");
// Define the database configuration object
const dbConfig = {
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "e-commerce",
    // The dialect of your database
    dialect: "mysql",
};
// Create a Sequelize instance with the database configuration
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
});
exports.default = sequelize;
