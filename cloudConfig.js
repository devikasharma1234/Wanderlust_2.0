const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const CloudinaryStorage = require("multer-storage-cloudinary").CloudinaryStorage || require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "wanderlust_DEV",
        allowedFormats: ["png", "jpg", "jpeg"],
    },
});

const uploads = multer({ dest: "uploads/" });

module.exports = {
    cloudinary,
    storage,
    uploads,
};



