import { async } from "regenerator-runtime";
import pool from "../databaseSQL";
import backup from "../utils/backup";

export const updateUserStatus = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const { ESTADO, MODIFICADO_POR } = req.body;
    await pool.query(
      `CALL ESTADO_USUARIO(${ID_USUARIO}, ${ESTADO}, ${MODIFICADO_POR}, @MENSAJE, @CODIGO);`
    );
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};

export const createRoles = async (req, res) => {
  try {
    const { ROL, DESCRIPCION, CREADO_POR } = req.body;
    await pool.query(
      `CALL CREAR_MS_ROL(${ROL}, ${DESCRIPCION}, ${CREADO_POR}, @MENSAJE, @CODIGO);`
    );
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};

export const updateRole = async (req, res) => {
  try {
    const { ID_ROL } = req.params;
    const { ROL, DESCRIPCION, MODIFICADO_POR } = req.body;
    await pool.query(
      `CALL ACTUALIZAR_MS_ROL(${ID_ROL},${ROL}, ${DESCRIPCION}, ${MODIFICADO_POR}, @MENSAJE, @CODIGO);`
    );
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};

export const createObject = async (req, res) => {
  try {
    const { OBJETO, TIPO_OBJETO, DESCRIPCION, CREADO_POR } = req.body;
    await pool.query("CALL CREAR_OBJETOS(?,?,?,?,@MENSAJE, @CODIGO)", [
      OBJETO,
      TIPO_OBJETO,
      DESCRIPCION,
      CREADO_POR,
    ]);
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};

export const updateObject = async (req, res) => {
  try {
    const { ID_OBJETO } = req.params;
    const { OBJETO, TIPO_OBJETO, DESCRIPCION, MODIFICADO_POR } = req.body;
    await pool.query("CALL MODIFICAR_OBJETOS(?,?,?,?,?,@MENSAJE, @CODIGO)", [
      ID_OBJETO,
      OBJETO,
      TIPO_OBJETO,
      DESCRIPCION,
      MODIFICADO_POR,
    ]);
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
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

    await pool.query("CALL CREAR_PERMISOS(?,?,?,?,?,?,?,@MENSAJE,@CODIGO);", [
      ID_OBJETO,
      ID_ROL,
      INSERTAR,
      ELIMINAR,
      ACTUALIZAR,
      CONSULTAR,
      CREADO_POR,
    ]);

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
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

    await pool.query(
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json(JSON.parse(JSON.stringify(mensaje)));
  } catch (error) {
    res.json(error);
  }
};

export const createPaymentMethod = async (req, res) => {
  try {
    const { FORMA_PAGO, DESCRIPCION } = req.body;
    await pool.query("CALL CREAR_METODO_PAGO(?,?,@MENSAJE, @CODIGO)", [
      FORMA_PAGO,
      DESCRIPCION,
    ]);

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

export const updatePaymentMethod = async (req, res) => {
  try {
    const { ID_PAGO } = req.params;
    const { FORMA_PAGO, DESCRIPCION } = req.body;
    await pool.query("CALL MODIFICAR_METODO_PAGO(?,?,?,@MENSAJE, @CODIGO)", [
      ID_PAGO,
      FORMA_PAGO,
      DESCRIPCION,
    ]);

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

export const createParameter = async (req, res) => {
  try {
    const { PARAMETRO, ID_USUARIO, VALOR, FECHA_CREACION, FECHA_MODIFICACION } =
      req.body;
    await pool.query("CALL CREAR_MS_PARAMETRO(?,?,?,?,?,@MENSAJE, @CODIGO)", [
      PARAMETRO,
      ID_USUARIO,
      VALOR,
    ]);

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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

export const getRoles = async (req, res) => {
  try {
    const roles = await pool.query("CALL OBTENER_ROLES(@MENSAJE, @CODIGO)");

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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

export const getComissionById = async (req, res) => {
  try {
    const { ID_USUARIO } = req.params;
    const COMISION = await pool.query(
      "CALL OBTENER_COMISIONES_USUARIO(?,@MENSAJE, @CODIGO, @COMISIONES_TOTAL)",
      [ID_USUARIO]
    );

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO, @COMISIONES_TOTAL as COMISIONES_TOTAL;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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
    let mensaje = await backup.backupDB(req.body.name, req.body.ubication);
    console.log(mensaje);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const { PUESTO, DESCRIPCION } = req.body;
    await pool.query("CALL CREAR_MP_PUESTO(?,?,@MENSAJE, @CODIGO);", [
      PUESTO,
      DESCRIPCION,
    ]);
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );

    res.status(200).json(JSON.parse(JSON.stringify(mensaje)));
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
    await pool.query("CALL ACTUALIZAR_MP_PUESTO(?,?,?,@MENSAJE, @CODIGO);", [
      ID_PUESTO,
      PUESTO,
      DESCRIPCION,
    ]);
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );

    res.status(200).json(JSON.parse(JSON.stringify(mensaje)));
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
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );

    res.status(200).json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
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
