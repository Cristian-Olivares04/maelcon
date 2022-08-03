<<<<<<< HEAD
require("dotenv").config({ path: "../.env" });
const cloudinary = require('cloudinary').v2;
import fs from "fs-extra";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const uploadImage = async (path_image, ubication) => {
    try {
        let infoCloud = await cloudinary.uploader.upload(path_image, {folder: ubication});
        fs.unlink(path_image);
        return infoCloud.url;
    } catch (error) {
        console.log("error al subir la imagen");
    }
}

exports.uploadImage = uploadImage;

=======
require("dotenv").config({ path: "./variables.env" });
const cloudinary = require("cloudinary");
import fs from "fs-extra";
import pool from "../databaseSQL";

const uploadImage = async (path_image, ubication) => {
  try {
    const parameters = await pool.query(
      "CALL OBTENER_PARAMETROS_CLOUDINARY(@MENSAJE, @CODIGO);"
    );
    const data = JSON.parse(JSON.stringify(parameters[0]));
    cloudinary.config({
      cloud_name: data[0]["VALOR"],
      api_key: data[1]["VALOR"],
      api_secret: data[2]["VALOR"],
    });

    let infoCloud = await cloudinary.v2.uploader.upload(path_image, {
      folder: ubication,
    });
    fs.unlink(path_image);
    return infoCloud.url;
  } catch (error) {
    console.log("error al subir la imagen: ", error);
  }
};

exports.uploadImage = uploadImage;
>>>>>>> 33103a1919df6771ec69a1e30f93602f11a76f8d
