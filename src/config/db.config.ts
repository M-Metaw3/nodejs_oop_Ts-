 // Import Sequelize from sequelize package
 import { Sequelize, Dialect } from "sequelize";

 // Define the database configuration object
 const dbConfig = {
   host: "localhost", // The host name of your database server
   port: 3306, // The port number of your database server
   username: "root", // The username for accessing your database
   password: "", // The password for accessing your database
   database: "e-commerce", // The name of your database
   // The dialect of your database
   dialect: "mysql" as Dialect,
 };
 
 // Create a Sequelize instance with the database configuration
 const sequelize = new Sequelize(
   dbConfig.database,
   dbConfig.username,
   dbConfig.password,
   {  
     host: dbConfig.host, 
     port: dbConfig.port,
     dialect: dbConfig.dialect,
   }
 );
 
 export default sequelize;
 