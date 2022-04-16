import jwt from "jsonwebtoken";
import config from "../config";
import pool from "../databaseSQL";

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
      NOMBRE,
      APELLIDO,
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

    await pool.query(
      "CALL REGISTRAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,?,?,@MENSAJE, @CODIGO);",
      [
        NOMBRE,
        APELLIDO,
        GENERO,
        RTN,
        TELEFONO,
        USUARIO,
        password,
        IMG_USUARIO,
        CORREO_ELECTRONICO,
        PREGUNTA,
        RESPUESTA,
      ]
    );

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );

    res.json(JSON.parse(JSON.stringify(mensaje)));
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
