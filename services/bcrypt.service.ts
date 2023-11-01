// Import bcrypt from bcrypt package
import bcrypt from "bcrypt";

// Define the salt rounds for bcrypt
const saltRounds = 10;

// Define the hash password function that takes a plain text password as input and returns a hashed password as output
const hashPassword = async (password: string) => {
  // Generate a salt using bcrypt
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using bcrypt with the salt
  const hash = await bcrypt.hash(password, salt);

  // Return the hashed password
  return hash;
};

// Define the compare password function that takes a plain text password and a hashed password as input and returns a boolean value indicating if they match or not
const comparePassword = async (password: string, hash: string) => {
  // Compare the password and the hash using bcrypt
  const result = await bcrypt.compare(password, hash);

  // Return the result
  return result;
};

// Export the service functions for using in other files
export { hashPassword, comparePassword };
