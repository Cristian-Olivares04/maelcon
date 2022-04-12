require("dotenv").config({ path: "./variables.env" });
const cloudinary = require('cloudinary');
import fs from "fs-extra";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (path_image, ubication) => {
    try {
        let infoCloud = await cloudinary.v2.uploader.upload(path_image, {folder: ubication});
        fs.unlink(path_image);
        return infoCloud.url;
    } catch (error) {
        console.log("error al subir la imagen");
    }
}

exports.uploadImage = uploadImage;