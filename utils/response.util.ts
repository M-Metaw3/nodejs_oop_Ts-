// Define the response format function
const responseFormat = (status: number, message: string, data?: any) => {
    // Create a response object with the status and message
    const response = {
      status: status,
      message: message,
      data: data, // Include the 'data' property in the response object
    };
  
    // Return the response object
    return response;
  };
  
  // Export the response format function for use in other files
  export default responseFormat;