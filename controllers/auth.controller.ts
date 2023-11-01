// Import jsonwebtoken from jsonwebtoken package
import jsonwebtoken from "jsonwebtoken";

// Import user and user_token models from models folder
import User from "../models/user.model";
const UserToken =require( "../models/user_token.model");

// Import jwt config from config folder
import jwtConfig from "../config/jwt.config";

// Import joi and bcrypt services from services folder
import { validateUser } from "../services/joi.service";
import { hashPassword, comparePassword } from "../services/bcrypt.service";

// Import response format from utils folder
import responseFormat from "../utils/response.util";

// Define the register function that takes a request and a response as input and creates a new user in the database
const register = async (req: any, res: any) => {
  try {
    // Get the user input from the request body
    const userInput = req.body;

    // Validate the user input using joi service with user schema
    const user = validateUser(userInput);

    // Check if the email already exists in the database using user model
    const existingUser = await User.findOne({
      where: {
        email: user.email,
      },
    });

    // If the email already exists, throw an error
    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Create a new user in the database using user model
    const newUser = await User.create(user);

    // Send a formatted response with status code 201 and user data
    res.status(201).send(responseFormat(201, "User registered successfully", newUser));
  } catch (error) {
    // If there is an error, send a formatted response with status code 400 and error message
    res.status(400).send(responseFormat(400, error.message));
  }
};

// Define the login function that takes a request and a response as input and authenticates the user and issues a token
const login = async (req: any, res: any) => {
  try {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the user by email in the database using user model
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the password with the hashed password in the database using bcrypt service
    const match = await comparePassword(password, user.password);

    // If the password does not match, throw an error
    if (!match) {
      throw new Error("Incorrect password");
    }

    // Generate a token using jsonwebtoken with the user id and role as payload and the secret key and expiration time as options
    const token = jsonwebtoken.sign(
      {
        id: user.id,
        role: user.role,
      },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );

    // Create a new user token in the database using user_token model with the user id and token as attributes
    const newUserToken = await UserToken.create({
      userId: user.id,
      token: token,
    });

    // Send a formatted response with status code 200 and token data
    res.status(200).send(responseFormat(200, "User logged in successfully", { token: token }));
  } catch (error) {
     // If there is an error, send a formatted response with status code 401 and error message
     res.status(401).send(responseFormat(401, error.message));
  }
};

// Define the logout function that takes a request and a response as input and invalidates the token in the database
const logout = async (req: any, res: any) => {
  try {
     // Get the token from the request header
     const token = req.headers["authorization"];

     // Delete the token from the database using user_token model
     await UserToken.destroy({
       where: {
         token: token,
       },
     });

     // Send a formatted response with status code 200 and message
     res.status(200).send(responseFormat(200, "User logged out successfully"));
  } catch (error) {
     // If there is an error, send a formatted response with status code 500 and error message
     res.status(500).send(responseFormat(500, error.message));
  }
};

// Define the refresh token function that takes a request and a response as input and issues a new token for the user
const refreshToken = async (req: any, res: any) => {
  try {
     // Get the token from the request header
     const token = req.headers["authorization"];

     // Verify the token using jsonwebtoken with the secret key
     const decoded = jsonwebtoken.verify(token, jwtConfig.secret);

     // If the token is not valid, throw an error
     if (!decoded) {
       throw new Error("Invalid token");
     }

     // Get the user id and role from the decoded token
     const userId = decoded.id;
     const userRole = decoded.role;

     // Generate a new token using jsonwebtoken with the user id and role as payload and the secret key and expiration time as options
     const newToken = jsonwebtoken.sign(
       {
         id: userId,
         role: userRole,
       },
       jwtConfig.secret,
       {
         expiresIn: jwtConfig.expiresIn,
       }
     );

     // Delete the old token from the database using user_token model
     await UserToken.destroy({
       where: {
         token: token,
       },
     });

     // Create a new user token in the database using user_token model with the user id and new token as attributes
     const newUserToken = await UserToken.create({
       userId: userId,
       token: newToken,
     });

     // Send a formatted response with status code 200 and new token data
     res.status(200).send(responseFormat(200, "Token refreshed successfully", { token: newToken }));
  } catch (error) {
    // If there is an error, send a formatted response with status code 401 and error message
    res.status(401).send(responseFormat(401, error.message));
  }
};

// Export the controller functions for using in other files
export { register, login, logout, refreshToken };
