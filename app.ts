const express =require( "express");
const { sequelize }= require( "./config/db.config");
const routes =require("./routes");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

// Initialize database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error:any) => {
    console.error("Unable to connect to the database:","error"+ error);
  });

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

export default app;