// Define the JWT configuration object
const jwtConfig = {
    secret: "secret", // The secret key for signing and verifying the tokens
    expiresIn: "1h", // The expiration time for the tokens
  };
  
  // Export the JWT configuration object for using in other files
  export default jwtConfig;
  