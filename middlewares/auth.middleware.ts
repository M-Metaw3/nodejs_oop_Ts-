// Import jsonwebtoken from jsonwebtoken package
import jsonwebtoken from "jsonwebtoken";

// Import user and user_token models from models folder
import User from "../models/user.model";
import Product from "../models/product.model";

import UserToken from "../models/user_token.model";

// Import jwt config from config folder
import jwtConfig from "../config/jwt.config";

// Import response format from utils folder
import responseFormat from "../utils/response.util";

// Define the verify token function that takes a request, a response and a next function as input and verifies the token in the request header
const verifyToken = async (req: any, res: any, next: any) => {
  try {
    // Get the token from the request header
    const token = req.headers["authorization"];

    // If the token is not provided, throw an error
    if (!token) {
      throw new Error("No token provided");
    }

    // Verify the token using jsonwebtoken with the secret key
    const decoded = jsonwebtoken.verify(token, jwtConfig.secret);

    // If the token is not valid, throw an error
    if (!decoded) {
      throw new Error("Invalid token");
    }

    // Get the user id and role from the decoded token
    const userId = decoded.id;
    const userRole = decoded.role;

    // Find the user by id in the database using user model
    const user = await User.findByPk(userId);

    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Find the user token by user id and token in the database using user_token model
    const userToken = await UserToken.findOne({
      where: {
        userId: userId,
        token: token,
      },
    });

    // If the user token is not found, throw an error
    if (!userToken) {
      throw new Error("Token not found");
    }

    // Set the user id and role in the request object for future use
    req.userId = userId;
    req.userRole = userRole;

    // Call the next function to proceed to the next middleware or controller
    next();
  } catch (error) {
    // If there is an error, send a formatted response with status code 401 and error message
    res.status(401).send(responseFormat(401, error.message));
  }
};

// Define the check user role function that takes a role as input and returns a middleware function that checks if the user has that role or not
const checkUserRole = (role: string) => {
  // Return a middleware function that takes a request, a response and a next function as input
  return (req: any, res: any, next: any) => {
    try {
      // Get the user role from the request object
      const userRole = req.userRole;

      // If the user role is not equal to the role parameter, throw an error
      if (userRole !== role) {
        throw new Error("You are not authorized to perform this action");
      }

      // Call the next function to proceed to the next middleware or controller
      next();
    } catch (error) {
      // If there is an error, send a formatted response with status code 403 and error message
      res.status(403).send(responseFormat(403, error.message));
    }
  };
};

// Define the check user ownership function that takes a request, a response and a next function as input and checks if the user owns the resource or not
const checkUserOwnership = async (req: any, res: any, next: any) => {
  try {
    // Get the user id from the request object
    const userId = req.userId;

    // Get the resource id from the request parameters
    const resourceId = req.params.id;

    // Find the resource by id in the database using product model
    const resource = await Product.findByPk(resourceId);

    // If the resource is not found, throw an error
    if (!resource) {
      throw new Error("Resource not found");
    }

    // Get the resource owner id from the resource object
    const resourceOwnerId = resource.userId;

    // If the resource owner id is not equal to the user id, throw an error
    if (resourceOwnerId !== userId) {
      throw new Error("You are not authorized to perform this action");
    }

    // Call the next function to proceed to the next middleware or controller
    next();
  } catch (error) {
     // If there is an error, send a formatted response with status code 403 and error message
     res.status(403).send(responseFormat(403, error.message));
  }
};

// Export the middleware functions for using in other files
export { verifyToken, checkUserRole, checkUserOwnership };
