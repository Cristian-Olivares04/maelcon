import { async } from "regenerator-runtime";
import pool from "../databaseSQL";
import backup from "../utils/backup";
var cloudinary_services = require("../utils/cloudinary_services");
import keys from "../keys";
import mysqldump from "mysqldump";
const fs = require("fs");
import { dir } from "../backups/directory";
const moment = require("moment");

export const updateUserStatus = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const { ESTADO, MODIFICADO_POR } = req.body;
    const objetos = await pool.query(
      "CALL ESTADO_USUARIO(?,?,?, @MENSAJE, @CODIGO);",
      [ID_USUARIO, ESTADO, MODIFICADO_POR]
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

export const createRoles = async (req, res) => {
  try {
    const { ROL, DESCRIPCION, CREADO_POR } = req.body;
    const Objetos = await pool.query(
      "CALL CREAR_MS_ROL(?,?,?,@MENSAJE, @CODIGO);",
      [ROL, DESCRIPCION, CREADO_POR]
    );
    const mensaje = JSON.parse(JSON.stringify(Objetos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
    });
  } catch (error) {
    res.json(error);
  }
};

export const updateRole = async (req, res) => {
  try {
    const { ID_ROL } = req.params;
    const { ROL, DESCRIPCION, MODIFICADO_POR } = req.body;
    const objetos = await pool.query(
      "CALL ACTUALIZAR_MS_ROL(?,?,?,?, @MENSAJE, @CODIGO);",
      [ID_ROL, ROL, DESCRIPCION, MODIFICADO_POR]
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

export const createObject = async (req, res) => {
  try {
    const { OBJETOS, TIPO_OBJETO, DESCRIPCION, CREADO_POR } = req.body;
    const objetos = await pool.query(
      "CALL CREAR_OBJETOS(?,?,?,?,@MENSAJE, @CODIGO)",
      [OBJETOS, TIPO_OBJETO, DESCRIPCION, CREADO_POR]
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

export const updateObject = async (req, res) => {
  try {
    const { ID_OBJETO } = req.params;
    const { OBJETOS, TIPO_OBJETO, DESCRIPCION, MODIFICADO_POR } = req.body;
    const objetos = await pool.query(
      "CALL MODIFICAR_OBJETOS(?,?,?,?,?,@MENSAJE, @CODIGO)",
      [ID_OBJETO, OBJETOS, TIPO_OBJETO, DESCRIPCION, MODIFICADO_POR]
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

export const createPermission = async (req, res) => {
  try {
    const {
      ID_OBJETO,
      ID_ROL,
      INSERTAR,
      ELIMINAR,
      ACTUALIZAR,
      CONSULTAR,
      CREADO_POR,
    } = req.body;

    const objetos = await pool.query(
      "CALL CREAR_PERMISOS(?,?,?,?,?,?,?,@MENSAJE,@CODIGO);",
      [ID_OBJETO, ID_ROL, INSERTAR, ELIMINAR, ACTUALIZAR, CONSULTAR, CREADO_POR]
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

export const updatePermission = async (req, res) => {
  try {
    const { ID_OBJETO } = req.params;
    const {
      ID_ROL,
      INSERTAR,
      ELIMINAR,
      ACTUALIZAR,
      CONSULTAR,
      MODIFICADO_POR,
    } = req.body;

    const objetos = await pool.query(
      "CALL ACTUALIZAR_PERMISOS(?,?,?,?,?,?,?,@MENSAJE,@CODIGO);",
      [
        ID_OBJETO,
        ID_ROL,
        INSERTAR,
        ELIMINAR,
        ACTUALIZAR,
        CONSULTAR,
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

export const createPaymentMethod = async (req, res) => {
  try {
    const { FORMA_PAGO, DESCRIPCION } = req.body;
    const objetos = await pool.query(
      "CALL CREAR_METODO_PAGO(?,?,@MENSAJE, @CODIGO)",
      [FORMA_PAGO, DESCRIPCION]
    );

    const mensaje = JSON.parse(JSON.stringify(objetos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
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

export const updatePaymentMethod = async (req, res) => {
  try {
    const { ID_PAGO } = req.params;
    const { FORMA_PAGO, DESCRIPCION } = req.body;
    const objetos = await pool.query(
      "CALL MODIFICAR_METODO_PAGO(?,?,?,@MENSAJE, @CODIGO)",
      [ID_PAGO, FORMA_PAGO, DESCRIPCION]
    );

    const mensaje = JSON.parse(JSON.stringify(objetos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
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

export const createParameter = async (req, res) => {
  try {
    const { PARAMETRO, ID_USUARIO, VALOR, FECHA_CREACION, FECHA_MODIFICACION } =
      req.body;
    const objetos = await pool.query(
      "CALL CREAR_MS_PARAMETRO(?,?,?,?,?,@MENSAJE, @CODIGO)",
      [PARAMETRO, ID_USUARIO, VALOR]
    );

    const mensaje = JSON.parse(JSON.stringify(objetos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
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

export const updateParameter = async (req, res) => {
  try {
    const parameters = req.body;

    for (let i = 0; i < parameters.length; i++) {
      const { ID_PARAMETRO, ID_USUARIO, VALOR } = req.body[i];
      console.log(req.body[i]);
      await pool.query(
        "CALL ACTUALIZAR_MS_PARAMETRO(?,?,?,@MENSAJE, @CODIGO)",
        [ID_PARAMETRO, ID_USUARIO, VALOR]
      );
    }

    const mensaje = {
      MENSAJE: "Parametros actualizados exitosamente.",
      CODIGO: 1,
    };
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    const mensaje = {
      MENSAJE: "Ha ocurrido un error inesperado, parametros no actualizados.",
      CODIGO: 0,
    };

    res.status(401).json({
      error: error.message,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const getPermissions = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const permisos = await pool.query(
      "CALL OBTENER_PERMISOS(?,@MENSAJE, @CODIGO)",
      [ID_USUARIO]
    );

    const mensaje = JSON.parse(JSON.stringify(permisos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
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

export const checkUser = async (req, res) => {
  try {
    const { CORREO } = req.body;
    const user = await pool.query(
      "CALL COMPROBAR_USUARIO(?,@MENSAJE, @CODIGO)",
      [CORREO]
    );
    const mensaje = JSON.parse(JSON.stringify(user[1]));
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

export const getRoles = async (req, res) => {
  try {
    const roles = await pool.query("CALL OBTENER_ROLES(@MENSAJE, @CODIGO)");

    const mensaje = JSON.parse(JSON.stringify(roles[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      roles: JSON.parse(JSON.stringify(roles[0])),
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

export const getRoleByID = async (req, res) => {
  try {
    const { ID_ROL } = req.params;
    const rol = await pool.query("CALL OBTENER_ROL(?,@MENSAJE, @CODIGO)", [
      ID_ROL,
    ]);

    const mensaje = JSON.parse(JSON.stringify(rol[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      rol: JSON.parse(JSON.stringify(rol[0])),
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

export const getObjects = async (req, res) => {
  try {
    const Objetos = await pool.query("CALL OBTENER_OBJETOS(@MENSAJE, @CODIGO)");

    const mensaje = JSON.parse(JSON.stringify(Objetos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      Objetos: JSON.parse(JSON.stringify(Objetos[0])),
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

export const getObjectByID = async (req, res) => {
  try {
    const { ID_OBJETO } = req.params;
    const OBJETO = await pool.query(
      "CALL OBTENER_OBJETO(?,@MENSAJE, @CODIGO)",
      [ID_OBJETO]
    );
    mm;
    const mensaje = JSON.parse(JSON.stringify(OBJETO[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      OBJETO: JSON.parse(JSON.stringify(OBJETO[0])),
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

export const getPaymentMethods = async (req, res) => {
  try {
    const met_pag = await pool.query(
      "CALL OBTENER_MET_PAGO(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(met_pag[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      Objetos: JSON.parse(JSON.stringify(met_pag[0])),
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

export const getPaymentMethodByID = async (req, res) => {
  try {
    const { ID_PAGO } = req.params;
    const PAGO = await pool.query(
      "CALL OBTENER_MET_PAGO_ID(?,@MENSAJE, @CODIGO)",
      [ID_PAGO]
    );

    const mensaje = JSON.parse(JSON.stringify(PAGO[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      OBJETO: JSON.parse(JSON.stringify(PAGO[0])),
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

export const getParameters = async (req, res) => {
  try {
    const parametros = await pool.query(
      "CALL OBTENER_PARAMETROS(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(parametros[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      parametros: JSON.parse(JSON.stringify(parametros[0])),
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

export const getParameterById = async (req, res) => {
  try {
    const { ID_PARAMETRO } = req.params;
    const PARAMETRO = await pool.query(
      "CALL OBTENER_PARAMETRO(?,@MENSAJE, @CODIGO)",
      [ID_PARAMETRO]
    );

    const mensaje = JSON.parse(JSON.stringify(PARAMETRO[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      parametro: JSON.parse(JSON.stringify(PARAMETRO[0])),
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

export const getLogs = async (req, res) => {
  try {
    const BITACORA = await pool.query(
      "CALL OBTENER_BITACORA(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(BITACORA[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      BITACORA: JSON.parse(JSON.stringify(BITACORA[0])),
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

export const getLogById = async (req, res) => {
  try {
    const { ID_BITACORA } = req.params;
    const BITACORA = await pool.query(
      "CALL OBTENER_BITACORA_ID(?,@MENSAJE, @CODIGO)",
      [ID_BITACORA]
    );

    const mensaje = JSON.parse(JSON.stringify(BITACORA[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      bitacora: JSON.parse(JSON.stringify(BITACORA[0])),
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

export const getComissions = async (req, res) => {
  try {
    const COMISION = await pool.query(
      "CALL OBTENER_COMISIONES(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(COMISION[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      COMISION: JSON.parse(JSON.stringify(COMISION[0])),
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

export const getPermissionsByRole = async (req, res) => {
  try {
    const rolePermissions = await pool.query(
      "CALL OBTENER_PERMISOS_ROL(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(rolePermissions[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      permisosRol: JSON.parse(JSON.stringify(rolePermissions[0])),
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

export const getComissionById = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const COMISION = await pool.query(
      "CALL OBTENER_COMISIONES_USUARIO(?,@MENSAJE, @CODIGO, @COMISIONES_TOTAL)",
      [ID_USUARIO]
    );

    const mensaje = JSON.parse(JSON.stringify(COMISION[0]));
    res.json({
      mensaje: [
        {
          MENSAJE: mensaje[0]["MENSAJE"],
          CODIGO: mensaje[0]["CODIGO"],
          COMISIONES_TOTAL: mensaje[0]["COMISIONES_TOTAL"],
        },
      ],
      COMISION: JSON.parse(JSON.stringify(COMISION[0])),
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

export const postBackupDB = async (req, res) => {
  try {
    let mensaje = await backup.backupDB(req.body.name);
    res.json(mensaje);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

export const postBackupDB2 = async (req, res) => {
  try {
    const fileName = `${req.body.name}_${moment().format("YYYY_MM_DD")}.sql`;
    const wstream = fs.createWriteStream(`${dir}/${fileName}`);

    await mysqldump({
      connection: {
        host: keys.database["host"],
        user: keys.database["user"],
        password: keys.database["password"],
        database: keys.database["database"],
      },
      dumpToFile: wstream.path,
    });

    res.download(wstream.path);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const { PUESTO, DESCRIPCION } = req.body;
    const objetos = await pool.query(
      "CALL CREAR_MP_PUESTO(?,?,@MENSAJE, @CODIGO);",
      [PUESTO, DESCRIPCION]
    );
    const mensaje = JSON.parse(JSON.stringify(objetos[0]));

    res.status(200).json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
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

export const updateJob = async (req, res) => {
  try {
    const { ID_PUESTO } = req.params;
    const { PUESTO, DESCRIPCION } = req.body;
    const objetos = await pool.query(
      "CALL ACTUALIZAR_MP_PUESTO(?,?,?,@MENSAJE, @CODIGO);",
      [ID_PUESTO, PUESTO, DESCRIPCION]
    );
    const mensaje = JSON.parse(JSON.stringify(objetos[0]));

    res.status(200).json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
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

export const getJobs = async (req, res) => {
  try {
    const puestos = await pool.query(
      "CALL OBTENER_PUESTOS(@MENSAJE, @CODIGO);"
    );
    const mensaje = JSON.parse(JSON.stringify(puestos[0]));

    res.status(200).json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      puestos: JSON.parse(JSON.stringify(puestos))[0],
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

//Actualizar usuario
export const updateUserByAdmin = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const {
      NOMBRE,
      APELLIDO,
      GENERO,
      RTN,
      ID_PUESTO,
      TELEFONO,
      SUELDO,
      ID_ROL,
      USUARIO,
      CORREO_ELECTRONICO,
      IMG_USUARIO,
      FECHA_VENCIMIENTO,
      MODIFICADO_POR,
      PREGUNTA,
      RESPUESTA
    } = req.body;

    let img;
    if (req.file) {
      console.log(req.file);
      img = await cloudinary_services.uploadImage(
        req.file.path,
        "Maelcon/Perfiles"
      );
    } else {
      const usuarioAct = await pool.query(
        "CALL OBTENER_USUARIO(?, @MENSAJE, @CODIGO)",
        [ID_USUARIO]
      );
      console.log(usuarioAct);
      img = usuarioAct[0][0].IMG_USUARIO;
    }

    const mensaje = await pool.query(
      `CALL ACTUALIZAR_MS_USUARIO_ADMIN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@MENSAJE,@CODIGO);`,
      [
        ID_USUARIO,
        NOMBRE,
        APELLIDO,
        GENERO,
        RTN,
        ID_PUESTO,
        TELEFONO,
        SUELDO,
        ID_ROL,
        USUARIO,
        CORREO_ELECTRONICO,
        img,
        MODIFICADO_POR,
        FECHA_VENCIMIENTO,
        PREGUNTA,
        RESPUESTA
      ]
    );
    
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};
