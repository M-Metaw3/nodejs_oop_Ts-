// Define the pagination function
const paginate = (data: any[], page: number) => {
    // Set the number of items per page
    const itemsPerPage = 10;
  
    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    // Validate the page number
    if (page < 1 || page > totalPages) {
      throw new Error("Invalid page number");
    }
  
    // Calculate the start and end indexes of the data for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Slice the data array to get the data for the current page
    const pageData = data.slice(startIndex, endIndex);
  
    // Return a paginated object with the data and other information
    return {
      data: pageData,
      totalPages: totalPages,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  };
  
  // Export the pagination function for using in other files
  export default paginate;
  