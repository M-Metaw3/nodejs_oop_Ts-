import sequelize  from './config/db.config';







import  express from 'express';
// import * as morgan from 'morgan';
// import * as cors from 'cors';
import { json, urlencoded } from 'body-parser';
import authRouter from './routes/auth.route'; // Import your auth routes
// import productRouter from './routes/product.route'; // Import your product routes

const app = express();

// Middleware
// app.use(cors());
// app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

// Define your routes
app.use('/auth', authRouter); // Mount auth routes under '/auth'
// app.use('/products', productRouter); // Mount product routes under '/products'

export default app;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error:any) => {
    console.error("Unable to connect to the database:", error);
  });
  console.log("metaweaa");