const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Ensure this is called to load environment variables

exports.connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Correct key names
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
};
