// Import joi from joi package
const joi =require( "joi");


// Import user and product validation schemas from utils folder
import userSchema from "../utils/user.validation";
import productSchema from "../utils/product.validation";

// Define the validate user function that takes a user object as input and returns a validated user object or an error as output
const validateUser = (user: any) => {
  // Validate the user object using joi with the user schema
  const result = joi.validate(user, userSchema);

  // If there is an error, throw it
  if (result.error) {
    throw result.error;
  }

  // If there is no error, return the validated user object
  return result.value;
};

// Define the validate product function that takes a product object as input and returns a validated product object or an error as output
const validateProduct = (product: any) => {
  // Validate the product object using joi with the product schema
  const result = joi.validate(product, productSchema);

  // If there is an error, throw it
  if (result.error) {
    throw result.error;
  }

  // If there is no error, return the validated product object
  return result.value;
};

// Export the service functions for using in other files
export { validateUser, validateProduct };
