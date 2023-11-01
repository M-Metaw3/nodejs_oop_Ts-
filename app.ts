import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

export default app;