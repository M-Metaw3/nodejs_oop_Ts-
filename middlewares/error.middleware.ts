// Import response format from utils folder
import responseFormat from "../utils/response.util";

// Define the error handler function that takes an error, a request, a response and a next function as input and sends a formatted response with status code 500 and error message
const errorHandler = (error: any, req: any, res: any, next: any) => {
  // Send a formatted response with status code 500 and error message
  res.status(500).send(responseFormat(500, error.message));
};

// Export the error handler function for using in other files
export default errorHandler;
