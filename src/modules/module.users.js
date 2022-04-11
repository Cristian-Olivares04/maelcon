import { use } from "express/lib/router";
import pool from "../databaseSQL";
var cloudinary_services = require("../utils/cloudinary_services");
const email = require('../utils/email');
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

  let img = '';
  //Guarda foto
  if(req.file){
    img = await cloudinary_services.uploadImage(req.file.path, 'Maelcon/Perfiles');
  }else{
      img = 'https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png';
  }
  
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
        ${img},
        ${CORREO_ELECTRONICO},
        ${CREADO_POR},
        ${FECHA_VENCIMIENTO},
        @MENSAJE, 
        @CODIGO);`
  );
  const mensaje = await pool.query(
    "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
  );
  let info = JSON.parse(JSON.stringify(mensaje));
    let contentHTML;

    if(info[0]["CODIGO"] == 1){
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
              Bienvenido al sistema de Maelcon, al recibir este correo se confirma la creación de su usuario el cual
              quedará a la espera de ser dado de alta por un administrador, los modulos de trabajo son variados y el 
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
              <a style="text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db" href="https://www.google.com">Ir a la página</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Maelcon S de R.L. 2022</p>
          </div>
        </td>
      </tr>
    </table>
      `;

      await email.sendEmail(CORREO_ELECTRONICO, "Confirmación de creación de cuenta ✔", contentHTML);
    }

    res.json(info);
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
    
    let img;
    if(req.file){
      img = await cloudinary_services.uploadImage(req.file.path, 'Maelcon/Perfiles');
    }else{
        img = 'https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png';
        nombreImg = '';
    }

    await pool.query(
      `CALL ACTUALIZAR_MS_USUARIO(${ID_USUARIO},${NOMBRE},${APELLIDO},${ID_PUESTO},${TELEFONO},${SUELDO},${ID_ROL},${img},${MODIFICADO_POR},@MENSAJE,@CODIGO);`
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
    let info = JSON.parse(JSON.stringify(mensaje));
    let contentHTML;

    const usuarioAct = await pool.query(
      "SELECT * FROM tbl_ms_usuario WHERE ID_USUARIO = ?",
      [ID_USUARIO]
    );
    const correo = usuarioAct[0]["CORREO_ELECTRONICO"];

    if(info[0]["CODIGO"] == 1){

      contentHTML = `
      <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
      <tr>
        <td style="padding: 0">
          <img style="padding: 0; display: block" src="https://res.cloudinary.com/maelcon/image/upload/v1649633845/Maelcon/strong_password_qmm0kb.png" width="100%">
        </td>
      </tr>
      
      <tr>
        <td style="background-color: #ecf0f1">
          <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
            <h2 style="color: #e67e22; margin: 0 0 7px">Cambio de contraseña 🔒</h2>
            <p style="margin: 2px; font-size: 15px">
              Se ha registrado un cambio de contraseña para tu usuario, si no has sido tu reporte de forma inmediata esta actividad
              irregular con el superior inmediato, de lo contrario ignore la advertencia.</p>
            <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
              <img style="padding: 0; width: 150px; margin: 5px" src="https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg">
            </div>
            <div style="width: 100%; text-align: center">
              <a style="text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db" href="https://www.google.com">Ir a la página</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Maelcon S de R.L. 2022</p>
          </div>
        </td>
      </tr>
    </table>
      `;

      await email.sendEmail(correo, "Cambio de contraseña exitoso ✔", contentHTML);
    }

    res.json(info);
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
