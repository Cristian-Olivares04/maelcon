import { use } from "express/lib/router";
import pool from "../databaseSQL";
var cloudinary_services = require("../utils/cloudinary_services");
const email = require("../utils/email");
import * as encrypt from "../middlewares/encrypt";
import config from "../config";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const {
    ID_PUESTO,
    NOMBRE_PERSONA,
    APELLIDO_PERSONA,
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
    PREGUNTA,
    RESPUESTA,
    ESTADO
  } = req.body;
  const pass2 = await encrypt.encryptPassword(CONTRASENA);
  const answer = await encrypt.encryptPassword(RESPUESTA);

  let img = "";
  //Guarda foto
  if (req.file) {
    img = await cloudinary_services.uploadImage(
      req.file.path,
      "Maelcon/Perfiles"
    );
  } else {
    img =
      "https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png";
  }

  const objetos = await pool.query(
    `CALL CREAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@MENSAJE,@CODIGO);`,
    [
      ID_PUESTO,
      NOMBRE_PERSONA,
      APELLIDO_PERSONA,
      GENERO,
      RTN,
      TELEFONO,
      SUELDO,
      ID_ROL,
      USUARIO,
      pass2,
      img,
      CORREO_ELECTRONICO,
      CREADO_POR,
      FECHA_VENCIMIENTO,
      PREGUNTA,
      answer,
      ESTADO
    ]
  );
  const mensaje = JSON.parse(JSON.stringify(objetos[0]));
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
            <h2 style="color: #e67e22; margin: 0 0 7px">Hola ${NOMBRE_PERSONA} ${APELLIDO_PERSONA}!</h2>
            <p style="margin: 2px; font-size: 15px">
              Bienvenido al sistema de Maelcon, al recibir este correo se confirma la creaci??n de su usuario el cual
              quedar?? a la espera de ser dado de alta por un administrador, los modulos de trabajo son variados y el 
              administrador ser?? el encargado de asignar tus areas.
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
              <a style="text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db" href="https://www.google.com">Ir a la p??gina</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Maelcon S de R.L. 2022</p>
          </div>
        </td>
      </tr>
    </table>
      `;

    await email.sendEmail(
      CORREO_ELECTRONICO,
      "Confirmaci??n de creaci??n de cuenta ???",
      contentHTML
    );
  }

  res.json(info);
};

export const getUsers = async (req, res) => {
  const usuarios = await pool.query("SELECT * FROM tbl_ms_usuario");
  res.json({
    usuarios: JSON.parse(JSON.stringify(usuarios)),
    mensaje: [{ MENSAJE: "Lista de Usuarios Retornada", CODIGO: 1 }],
  });
};

export const getUserById = async (req, res) => {
  const { ID_USUARIO } = req.params;
  const id = parseInt(ID_USUARIO, 10);
  const usuario = await pool.query(
    "SELECT * FROM tbl_ms_usuario WHERE ID_USUARIO = ?",
    [id]
  );
  res.json({
    usuarios: JSON.parse(JSON.stringify(usuario)),
    mensaje: [{ MENSAJE: "UsuariosRetornada", CODIGO: 1 }],
  });
};

export const updateUserById = async (req, res) => {
  const { ID_USUARIO } = req.params;
  const {
    ID_PUESTO,
    NOMBRE_PERSONA,
    APELLIDO_PERSONA,
    TELEFONO,
    SUELDO,
    ID_ROL,
    IMG_USUARIO,
    MODIFICADO_POR,
  } = req.body;

  let img = "";
  //Guarda foto
  if (req.file) {
    img = await cloudinary_services.uploadImage(
      req.file.path,
      "Maelcon/Perfiles"
    );
  } else {
    img =
      "https://res.cloudinary.com/maelcon/image/upload/v1649551517/Maelcon/Perfiles/tgjtgsblxyubftltsxra.png";
  }

  const objetos = await pool.query(
    "CALL ACTUALIZAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,@MENSAJE,@CODIGO);",
    [
      ID_USUARIO,
      NOMBRE_PERSONA,
      APELLIDO_PERSONA,
      ID_PUESTO,
      TELEFONO,
      SUELDO,
      ID_ROL,
      img,
      MODIFICADO_POR,
    ]
  );
  const mensaje = JSON.parse(JSON.stringify(objetos[0]));
  let info = JSON.parse(JSON.stringify(mensaje));

  res.json(objetos);
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
      NOMBRE_PERSONA,
      APELLIDO_PERSONA,
      ID_PUESTO,
      TELEFONO,
      SUELDO,
      ID_ROL,
      IMG_USUARIO,
      MODIFICADO_POR,
    } = req.body;

    let img;
    if (req.file) {
      img = await cloudinary_services.uploadImage(
        req.file.path,
        "Maelcon/Perfiles"
      );
      console.log(img);
    } else {
      const usuarioAct = await pool.query(
        "CALL OBTENER_USUARIO(?, @MENSAJE, @CODIGO)",
        [ID_USUARIO]
      );
      console.log(usuarioAct);
      img = usuarioAct[0][0].IMG_USUARIO;
    }

    const objetos = await pool.query(
      "CALL ACTUALIZAR_MS_USUARIO(?,?,?,?,?,?,?,?,?,@MENSAJE,@CODIGO);",
      [
        ID_USUARIO,
        NOMBRE_PERSONA,
        APELLIDO_PERSONA,
        ID_PUESTO,
        TELEFONO,
        SUELDO,
        ID_ROL,
        img,
        MODIFICADO_POR,
      ]
    );
    const mensaje = JSON.parse(JSON.stringify(objetos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
    });
  } catch (error) {
    res.json(error);
  }
};

export const securityQA = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const { PREGUNTA, RESPUESTA, CREADO_POR } = req.body;
    const pass = await encrypt.encryptPassword(RESPUESTA);
    const objetos = await pool.query(
      "CALL CREAR_MS_PREGUNTA_RECUPERACION(?,?,?,?,@MENSAJE, @CODIGO);",
      [ID_USUARIO, PREGUNTA, RESPUESTA, CREADO_POR]
    );
    const mensaje = JSON.parse(JSON.stringify(objetos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
    });
  } catch (error) {
    res.json(error);
  }
};

export const updateSecurytyQA = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const { PREGUNTA, RESPUESTA, MODIFICADO_POR } = req.body;
    const pass = await encrypt.encryptPassword(RESPUESTA);

    const objetos = await pool.query(
      "CALL ACTUALIZAR_MS_PREGUNTA_RECUPERACION(?,?,?,?,@MENSAJE, @CODIGO);",
      [ID_USUARIO, PREGUNTA, pass, MODIFICADO_POR]
    );
    const mensaje = JSON.parse(JSON.stringify(objetos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
    });
  } catch (error) {
    res.json(error);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const { MODIFICADO_POR, CONTRASENA } = req.body;
    const password = await encrypt.encryptPassword(CONTRASENA);
    const objetos = await pool.query(
      "CALL MODIFICAR_CONTRASENA(?,?,?, @MENSAJE, @CODIGO);",
      [ID_USUARIO, MODIFICADO_POR, password]
    );

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    let info = JSON.parse(JSON.stringify(mensaje));
    let contentHTML;
    const mensaje2 = JSON.parse(JSON.stringify(objetos[0]));

    const usuarioAct = await pool.query(
      "SELECT * FROM TBL_MS_USUARIO WHERE ID_USUARIO = ?",
      [ID_USUARIO]
    );
    const correo = usuarioAct[0]["CORREO_ELECTRONICO"];

    if (info[0]["CODIGO"] == 1) {
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
            <h2 style="color: #e67e22; margin: 0 0 7px">Cambio de contrase??a ????</h2>
            <p style="margin: 2px; font-size: 15px">
              Se ha registrado un cambio de contrase??a para tu usuario, si no has sido tu reporte de forma inmediata esta actividad
              irregular con el superior inmediato, de lo contrario ignore la advertencia.</p>
            <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
              <img style="padding: 0; width: 150px; margin: 5px" src="https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg">
            </div>
            <div style="width: 100%; text-align: center">
              <a style="text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db" href="https://www.google.com">Ir a la p??gina</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Maelcon S de R.L. 2022</p>
          </div>
        </td>
      </tr>
    </table>
      `;

      await email.sendEmail(
        correo,
        "Cambio de contrase??a exitoso ???",
        contentHTML
      );
    }

    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      info: info,
    });
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

export const getSecurityQuestionByEmail = async (req, res) => {
  try {
    const { CORREO } = req.params;
    const user = await pool.query(
      "CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)",
      [CORREO]
    );
    const userData = JSON.parse(JSON.stringify(user[0][0]));
    if (userData["CODIGO"] == 0) {
      return res.json({ mensaje: [userData] });
    }
    const pregunta = await pool.query("CALL OBTENER_PREGUNTA_SEGURIDAD(?)", [
      userData["ID_USUARIO"],
    ]);
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    const processedQuestion = Object.values(
      JSON.parse(JSON.stringify(pregunta[0][0]))
    );
    if (processedQuestion == "")
      return res.json({
        mensaje: [
          {
            MENSAJE:
              "El usuario seleccionado no cuenta con una pregunta de seguridad",
            CODIGO: 0,
          },
        ],
      });

    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
      pregunta: processedQuestion,
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

export const getAnswerByEmail = async (req, res) => {
  try {
    const { CORREO } = req.params;
    const { RESPUESTA } = req.body;
    const user = await pool.query(
      "CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)",
      [CORREO]
    );
    const userData = Object.values(JSON.parse(JSON.stringify(user[0][0])));
    const respuesta = await pool.query("CALL OBTENER_RESPUESTA_SEGURIDAD(?)", [
      userData[0],
    ]);
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    const processedAnswer = Object.values(
      JSON.parse(JSON.stringify(respuesta[0][0]))
    );
    console.log(processedAnswer[0]);
    const validatePassword = await encrypt.comparePassword(
      RESPUESTA,
      processedAnswer[0]
    );

    if (!validatePassword) {
      return res.json({ mensaje: "Respuesta a pregunta de seguridad erronea" });
    }
    const CONTRASENA = Math.floor(Math.random() * (999999 - 100000) - 100000);

    const password = await encrypt.encryptPassword(CONTRASENA.toString());
    const tokenSQL = jwt.sign(
      { id: userData[0], password: password, correo: CORREO },
      config.SECRET,
      {
        expiresIn: 86400 * 7,
      }
    );
    let contentHTML;
    const confirmacion = JSON.parse(JSON.stringify(mensaje));
    if (confirmacion[0]["CODIGO"] == 1) {
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
            <h2 style="color: #e67e22; margin: 0 0 7px">Cambio de contrase??a ????</h2>
            <p style="margin: 2px; font-size: 15px">
              Se ha registrado un reestablecimiento de contrase??a para tu usuario, la duracion de este enlace es de 7 dias,
               si no has sido tu reporte de forma inmediata esta actividad
              irregular con el superior inmediato, de lo contrario ignore la advertencia.</p>
            <a href="https://maelcon.live/recovery-password/${tokenSQL}" style="" target="_blank">Haz click en este enlace para ingresar tu nueva contrase??a</a>
            <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
              <img style="padding: 0; width: 150px; margin: 5px" src="https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg">
            </div>
            <div style="width: 100%; text-align: center">
              <a style="text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db" href="https://www.google.com">Ir a la p??gina</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Maelcon S de R.L. 2022</p>
          </div>
        </td>
      </tr>
    </table>
      `;

      await email.sendEmail(
        CORREO,
        "Reestablecimiento de contrase??a exitoso ???",
        contentHTML
      );
    }
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
      respuesta: validatePassword,
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

export const generatePasswordRecoveryTokenByEmail = async (req, res) => {
  try {
    const { CORREO } = req.params;
    const user = await pool.query(
      "CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)",
      [CORREO]
    );
    const userData = Object.values(JSON.parse(JSON.stringify(user[0][0])));
    const CONTRASENA = Math.floor(Math.random() * (999999 - 100000) - 100000);

    const password = await encrypt.encryptPassword(CONTRASENA.toString());
    const tokenSQL = jwt.sign(
      { id: userData[0], password: password, correo: CORREO },
      config.SECRET,
      {
        expiresIn: 86400 * 7,
      }
    );

    let contentHTML;
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    const confirmacion = JSON.parse(JSON.stringify(mensaje));
    if (confirmacion[0]["CODIGO"] == 1) {
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
            <h2 style="color: #e67e22; margin: 0 0 7px">Cambio de contrase??a ????</h2>
            <p style="margin: 2px; font-size: 15px">
              Se ha registrado un reestablecimiento de contrase??a para tu usuario, la duracion de este enlace es de 7 dias,
               si no has sido tu reporte de forma inmediata esta actividad
              irregular con el superior inmediato, de lo contrario ignore la advertencia.</p>
            <a href="https://maelcon.live/recovery-password/${tokenSQL}" style="" target="_blank">Haz click en este enlace para ingresar tu nueva contrase??a</a>
            <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
              <img style="padding: 0; width: 150px; margin: 5px" src="https://res.cloudinary.com/maelcon/image/upload/v1649559247/Maelcon/descarga_oxoktv.jpg">
            </div>
            <div style="width: 100%; text-align: center">
              <a style="text-decoration: none; border-radius: 5px; padding: 20px; color: white; background-color: #3498db" href="https://www.google.com">Ir a la p??gina</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Maelcon S de R.L. 2022</p>
          </div>
        </td>
      </tr>
    </table>
      `;

      await email.sendEmail(
        CORREO,
        "Reestablecimiento de contrase??a exitoso ???",
        contentHTML
      );
    }

    res.json(tokenSQL);
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

export const verifyRecoveryToken = async (req, res) => {
  try {
    const { token } = req.params;
    const { CONTRASENA } = req.body;

    const password = await encrypt.encryptPassword(CONTRASENA);

    if (!token) {
      return res.status(403).json({ mensaje: "No se ha enviado ningun token" });
    }

    const decoded = jwt.verify(token, config.SECRET);
    const user = await pool.query(
      "CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)",
      [decoded["correo"]]
    );
    const userData = JSON.parse(JSON.stringify(user[0][0]));
    console.log(userData["ID_USUARIO"]);
    const updatedPassword = await pool.query(
      "CALL MODIFICAR_CONTRASENA(?,?,?, @MENSAJE, @CODIGO);",
      [userData["ID_USUARIO"], userData["ID_USUARIO"], password]
    );
    res.json(updatedPassword[0]);
  } catch (error) {
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    if (error.message == "jwt expired")
      return res.json({
        mensaje: [
          {
            MENSAJE: "El token ha expirado, restablecer contrase??a de nuevo",
            CODIGO: 0,
          },
        ],
      });
    res.status(401).json({
      error: error.message,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const getUsersSQL = async (req, res) => {
  try {
    const user = await pool.query("CALL OBTENER_USUARIOS(@MENSAJE, @CODIGO)");

    const mensaje = JSON.parse(JSON.stringify(user[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
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

    const mensaje = JSON.parse(JSON.stringify(user[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
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

export const getMyUser = async (req, res) => {
  try {
    const ID_USUARIO = req.userId;
    const user = await pool.query("CALL OBTENER_USUARIO(?,@MENSAJE, @CODIGO)", [
      ID_USUARIO,
    ]);
    const permisos = await pool.query(
      "CALL OBTENER_PERMISOS(?,@MENSAJE, @CODIGO)",
      [ID_USUARIO]
    );
    const mensaje = JSON.parse(JSON.stringify(user[0]));
    console.log(ID_USUARIO);
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      usuario: JSON.parse(JSON.stringify(user[0])),
      permisos: JSON.parse(JSON.stringify(permisos[0])),
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
