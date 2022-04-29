import jwt from "jsonwebtoken";
import config from "../config";
const email = require("../utils/email");
import pool from "../databaseSQL";
var cloudinary_services = require("../utils/cloudinary_services");

import * as encrypt from "../middlewares/encrypt";

export const singInSQL = async (req, res) => {
  try {
    const usuario = await pool.query(
      "CALL COMPROBAR_USUARIO(?,@MENSAJE,@CODIGO)",
      [req.body.CORREO_ELECTRONICO]
    );
    const user = JSON.parse(JSON.stringify(usuario[0]));
    if (!user) {
      return res.status(400).json({ mensaje: "usuario SQL no encontrado" });
    }

    const validatePassword = await encrypt.comparePassword(
      req.body.CONTRASENA,
      user[0].CONTRASENA
    );

    if (!validatePassword)
      return res
        .status(401)
        .json({ mensaje: "Contrasena SQL erronea", token: null });
    const tokenSQL = jwt.sign({ id: user[0].ID_USUARIO }, config.SECRET, {
      expiresIn: 84600,
    });

    res.json({ token: tokenSQL, user: user });
  } catch (error) {
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.status(401).json({
      error: error.message,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const singUpSQL = async (req, res) => {
  try {
    const {
      NOMBRE_PERSONA,
      APELLIDO_PERSONA,
      GENERO,
      RTN,
      TELEFONO,
      USUARIO,
      CONTRASENA,
      IMG_USUARIO,
      CORREO_ELECTRONICO,
      PREGUNTA,
      RESPUESTA,
    } = req.body;

    const password = await encrypt.encryptPassword(CONTRASENA);
    const answer = await encrypt.encryptPassword(RESPUESTA);
    let img;
    //Guarda foto
    if (req.file) {
      img = await cloudinary_services.uploadImage(
        req.file.path,
        "Maelcon/Perfiles"
      );
      console.log(img);
    } else {
      img =
        "https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png";
    }

    await pool.query(
      "CALL REGISTRAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,?,?,@MENSAJE, @CODIGO);",
      [
        NOMBRE_PERSONA,
        APELLIDO_PERSONA,
        GENERO,
        RTN,
        TELEFONO,
        USUARIO,
        password,
        img,
        CORREO_ELECTRONICO,
        PREGUNTA,
        answer,
      ]
    );

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );

    let info = JSON.parse(JSON.stringify(mensaje));
    let contentHTML;

    if (info[0]["CODIGO"] == 1) {
      contentHTML = `
      <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
    
      <tr>
        <td style="padding: 0">
          <img style="padding: 0; display: block" src="https://res.cloudinary.com/maelcon/image/upload/v1649635374/Maelcon/BLG2011-YM-AMS-VirtualWelcome-Card_ufn1k5.png" width="100%">
        </td>
      </tr>
      
      <tr>
        <td style="background-color: #ecf0f1">
          <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
            <h2 style="color: #e67e22; margin: 0 0 7px">Hola ${NOMBRE} ${APELLIDO}!</h2>
            <p style="margin: 2px; font-size: 15px">
              Bienvenido al sistema de Maelcon, se ha recibido su solicitud de creación de usuario debe esperar
              hasta que un administradar active su cuenta, los modulos de trabajo son variados y el 
              administrador será el encargado de asignar tus areas.
              <b>Posibles areas de trabajo:</b></p>
            <ul style="font-size: 15px;  margin: 10px 0">
              <li>Modulo de compras.</li>
              <li>Modulo de ventas.</li>
              <li>Administrador de usuarios.</li>
              <li>Administrador de sistema.</li>
              <li>Control de inventarios y productos.</li>
            </ul>
            <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
              <img style="padding: 0; width: 150px; margin: 5px" src="https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg">
            </div>
            <div style="width: 100%; text-align: center">
              <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="https://www.google.com">Ir a la página</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Maelcon S de R.L. 2022</p>
          </div>
        </td>
      </tr>
    </table>
      `;

      await email.sendEmail(
        CORREO_ELECTRONICO,
        "Solicitud de registro enviada ✔",
        contentHTML
      );
    }

    res.json(info);
  } catch (error) {
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );

    res.status(401).json({
      error: error.message,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};
