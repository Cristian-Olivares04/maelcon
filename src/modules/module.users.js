import { use } from "express/lib/router";
import pool from "../databaseSQL";
import * as encrypt from "../middlewares/encrypt";

export const createUser = async (req, res) => {
  const {
    ID_PUESTO,
    NOMBRE,
    APELLIDO,
    GENERO,
    RTN,
    TELEFONO,
    SUELDO,
    ID_ROL,
    USUARIO,
    CONTRASENA,
    IMG_USUARIO,
    CORREO_ELECTRONICO,
    CREADO_POR,
    FECHA_VENCIMIENTO,
  } = req.body;
  const pass2 = await encrypt.encryptPassword(CONTRASENA);
  await pool.query(
    `CALL CREAR_MS_USUARIO(
        ${ID_PUESTO},
        ${NOMBRE},
        ${APELLIDO},
        ${GENERO},
        ${RTN},
        ${TELEFONO},
        ${SUELDO},
        ${ID_ROL},
        ${USUARIO},
        '${pass2}',
        ${IMG_USUARIO},
        ${CORREO_ELECTRONICO},
        ${CREADO_POR},
        ${FECHA_VENCIMIENTO},
        @MENSAJE, 
        @CODIGO);`
  );
  const mensaje = await pool.query(
    "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
  );
  res.json(JSON.parse(JSON.stringify(mensaje)));
};

export const getUsers = async (req, res) => {
  const usuarios = await pool.query("SELECT * FROM tbl_ms_usuario");
  res.json(JSON.parse(JSON.stringify(usuarios)));
};

export const getUserById = async (req, res) => {
  const { ID_USUARIO } = req.params;
  const id = parseInt(ID_USUARIO, 10);
  const usuario = await pool.query(
    "SELECT * FROM tbl_ms_usuario WHERE ID_USUARIO = ?",
    [id]
  );
  res.json(JSON.parse(JSON.stringify(usuario)));
};

export const updateUserById = async (req, res) => {
  const { ID_USUARIO } = req.params;
  const id = parseInt(ID_USUARIO, 10);
  await pool.query("UPDATE tbl_ms_usuario set ? WHERE ID_USUARIO = ?", [
    req.body,
    id,
  ]);
  res.json({ message: "El usuario ha sido actualizado" });
};

export const deleteUserById = async (req, res) => {
  const { ID_USUARIO } = req.params;
  const id = parseInt(ID_USUARIO, 10);
  await pool.query("DELETE FROM tbl_ms_usuario WHERE ID_USUARIO = ?", [id]);

  res.json({ message: "El usuario ha sido eliminado" });
};

//Actualizar usuario
export const updateUserByIdPA = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const {
      NOMBRE,
      APELLIDO,
      ID_PUESTO,
      TELEFONO,
      SUELDO,
      ID_ROL,
      IMG_USUARIO,
      MODIFICADO_POR,
    } = req.body;
    console.log(
      ID_USUARIO,
      NOMBRE,
      APELLIDO,
      ID_PUESTO,
      TELEFONO,
      SUELDO,
      ID_ROL,
      IMG_USUARIO,
      MODIFICADO_POR
    );
    await pool.query(
      `CALL ACTUALIZAR_MS_USUARIO(${ID_USUARIO},${NOMBRE},${APELLIDO},${ID_PUESTO},${TELEFONO},${SUELDO},${ID_ROL},${IMG_USUARIO},${MODIFICADO_POR},@MENSAJE,@CODIGO);`
    );
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};

export const securityQA = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const { PREGUNTA, RESPUESTA, CREADO_POR } = req.body;
    const pass = await encrypt.encryptPassword(RESPUESTA);
    await pool.query(
      `CALL CREAR_MS_PREGUNTA_RECUPERACION(${ID_USUARIO},${PREGUNTA},'${pass}',${CREADO_POR},@MENSAJE, @CODIGO);`
    );
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};

export const updateSecurytyQA = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const { PREGUNTA, RESPUESTA, MODIFICADO_POR } = req.body;
    const pass = await encrypt.encryptPassword(RESPUESTA);

    await pool.query(
      `CALL ACTUALIZAR_MS_PREGUNTA_RECUPERACION(${ID_USUARIO},${PREGUNTA},'${pass}',${MODIFICADO_POR},@MENSAJE, @CODIGO);`
    );
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const { MODIFICADO_POR, CONTRASENA } = req.body;
    const password = await encrypt.encryptPassword(CONTRASENA);
    await pool.query("CALL MODIFICAR_CONTRASENA(?,?,?, @MENSAJE, @CODIGO);", [
      ID_USUARIO,
      MODIFICADO_POR,
      password,
    ]);

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};

export const getSecurityQuestion = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const pregunta = await pool.query("CALL OBTENER_PREGUNTA_SEGURIDAD(?)", [
      ID_USUARIO,
    ]);
    res.json(JSON.parse(JSON.stringify(pregunta[0])));
  } catch (error) {
    res.json(error);
  }
};

export const getSecurityAnswer = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const respuesta = await pool.query("CALL OBTENER_RESPUESTA_SEGURIDAD(?)", [
      ID_USUARIO,
    ]);
    res.json(JSON.parse(JSON.stringify(respuesta[0])));
  } catch (error) {
    res.json(error);
  }
};

export const getUsersSQL = async (req, res) => {
  try {
    const user = await pool.query("CALL OBTENER_USUARIOS(@MENSAJE, @CODIGO)");

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
      usuario: JSON.parse(JSON.stringify(user[0])),
    });
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

export const getUserSQL = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const user = await pool.query("CALL OBTENER_USUARIO(?,@MENSAJE, @CODIGO)", [
      ID_USUARIO,
    ]);

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
      usuario: JSON.parse(JSON.stringify(user[0])),
    });
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
