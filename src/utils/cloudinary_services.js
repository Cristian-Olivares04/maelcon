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
