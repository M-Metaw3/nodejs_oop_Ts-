// Import joi from joi package
const joi =require( "joi");

// Define the product validation schema
const productSchema = joi.object({
  name: joi.string().min(3).max(50).required(), // The name must be a string with minimum 3 and maximum 50 characters and is required
  description: joi.string().min(10).max(500).required(), // The description must be a string with minimum 10 and maximum 500 characters and is required
  price: joi.number().min(0).precision(2).required(), // The price must be a number with minimum 0 and two decimal places and is required
  image: joi.any().required(), // The image must be provided and is required
});

// Export the product validation schema for using in other files
export default productSchema;
