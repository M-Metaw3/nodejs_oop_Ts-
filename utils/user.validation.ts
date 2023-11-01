// Import joi from joi package
const joi =require( "joi");


// Define the user validation schema
const userSchema = joi.object({
  name: joi.string().min(3).max(30).required(), // The name must be a string with minimum 3 and maximum 30 characters and is required
  email: joi.string().email().required(), // The email must be a valid email address and is required
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,}$")).required(), // The password must be a string with at least 8 alphanumeric characters and is required
});

// Export the user validation schema for using in other files
export default userSchema;
