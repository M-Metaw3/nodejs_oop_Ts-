// Import multer from multer package
import multer from "multer";

// Define the storage option for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder to src/uploads
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    // Set the file name to the original name with a timestamp prefix
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Define the file filter option for multer
const fileFilter = (req, file, cb) => {
  // Accept only image files with jpg, jpeg or png extensions
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Define the limits option for multer
const limits = {
  fileSize: 1024 * 1024 * 5, // Set the file size limit to 5 MB
};

// Create a multer instance with the options
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

// Export the multer instance for using in other files
export default upload;
