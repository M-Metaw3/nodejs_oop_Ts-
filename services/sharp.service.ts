// Import sharp from sharp package
import sharp from "sharp";

// Define the resize image function that takes an image buffer as input and returns a resized image buffer as output
const resizeImage = async (image: Buffer) => {
  // Resize and optimize the image using sharp with some options
  const resizedImage = await sharp(image)
    .resize(300, 300) // Resize the image to 300 x 300 pixels
    .jpeg({ quality: 80 }) // Convert the image to jpeg format with 80% quality
    .toBuffer(); // Convert the image to buffer

  // Return the resized image buffer
  return resizedImage;
};

// Export the service function for using in other files
export default resizeImage;
