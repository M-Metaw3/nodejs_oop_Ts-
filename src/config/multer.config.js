"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/'); // Set the destination folder for uploads
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Set the file name
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept only image files
    }
    else {
        cb(new Error('Invalid file type'), false);
    }
};
var limits = {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
};
var upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });
exports.default = upload;
