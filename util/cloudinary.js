const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const opt = {
    overwrite:true,
    invalidate:true,
    resource_type:"auto"
};

module.exports = {cloudinary,opt}