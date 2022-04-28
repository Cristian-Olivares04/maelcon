import pool from "../databaseSQL";
import * as encrypt from "../middlewares/encrypt";

export const createClient = async (req, res) => {
  try {
    const { NOMBRE_CLIENTE, RTN, DIRECCION_CLIENTE, TELEFONO_CLIENTE } =
      req.body;
    const objetos = await pool.query(
      "CALL CREAR_CLIENTE(?,?,?,?,@MENSAJE, @CODIGO)",
      [NOMBRE_CLIENTE, RTN, DIRECCION_CLIENTE, TELEFONO_CLIENTE]
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

export const updateClient = async (req, res) => {
  try {
    const { ID_CLIENTE } = req.params;
    const { NOMBRE_CLIENTE, RTN, DIRECCION_CLIENTE, TELEFONO_CLIENTE } =
      req.body;
    const objetos = await pool.query(
      "CALL ACTUALIZAR_CLIENTE(?,?,?,?,?,@MENSAJE, @CODIGO)",
      [ID_CLIENTE, NOMBRE_CLIENTE, RTN, DIRECCION_CLIENTE, TELEFONO_CLIENTE]
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
      error: error,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const createSaleHeader = async (req, res) => {
  try {
    const { ID_PAGO, ID_USUARIO, ID_CLIENTE, DESCRIPCION_VENTA } = req.body;
    const objetos = await pool.query(
      "CALL CREAR_ENCABEZADO_VENTA(?,?,?,?,@MENSAJE, @CODIGO)",
      [ID_PAGO, ID_USUARIO, ID_CLIENTE, DESCRIPCION_VENTA]
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
      error: error,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const updateSaleHeader = async (req, res) => {
  try {
    const { ID_VENTA } = req.params;
    const { ID_PAGO, ID_USUARIO, ID_CLIENTE, DESCRIPCION_VENTA } = req.body;
    const objetos = await pool.query(
      "CALL ACTUALIZAR_ENCABEZADO_VENTA(?,?,?,?,?,@MENSAJE, @CODIGO)",
      [ID_VENTA, ID_PAGO, ID_USUARIO, ID_CLIENTE, DESCRIPCION_VENTA]
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
      error: error,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const addProduct2Sale = async (req, res) => {
  try {
    const { ID_VENTA } = req.params;
    const { ID_PRODUCTO, CANTIDAD_PRODUCTO } = req.body;
    const objetos = await pool.query(
      "CALL AGREGAR_PRODUCTO_VENTA(?,?,?,@MENSAJE, @CODIGO)",
      [ID_PRODUCTO, ID_VENTA, CANTIDAD_PRODUCTO]
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
      error: error,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const updateProductOnSale = async (req, res) => {
  try {
    const { ID_VENTA } = req.params;
    const { ID_PRODUCTO, CANTIDAD_PRODUCTO } = req.body;
    const objetos = await pool.query(
      "CALL ACTUALIZAR_PRODUCTO_VENTA(?,?,?,@MENSAJE, @CODIGO)",
      [ID_PRODUCTO, ID_VENTA, CANTIDAD_PRODUCTO]
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
      error: error,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const deleteProductOnSale = async (req, res) => {
  try {
    const { ID_VENTA } = req.params;
    const { ID_PRODUCTO } = req.body;
    const objetos = await pool.query(
      "CALL ELIMINAR_PRODUCTO_VENTA(?,?,@MENSAJE, @CODIGO)",
      [ID_PRODUCTO, ID_VENTA]
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
      error: error,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const { ID_VENTA } = req.params;
    const { ID_USUARIO } = req.body;
    const objetos = await pool.query(
      "CALL ELIMINAR_VENTA(?,?,@MENSAJE, @CODIGO)",
      [ID_VENTA, ID_USUARIO]
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
      error: error,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const processSale = async (req, res) => {
  try {
    const { ID_VENTA } = req.params;
    const { ID_USUARIO } = req.body;
    const objetos = await pool.query(
      "CALL PROCESAR_VENTA(?,?,@MENSAJE, @CODIGO)",
      [ID_VENTA, ID_USUARIO]
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
      error: error,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const getClients = async (req, res) => {
  try {
    const user = await pool.query("CALL OBTENER_CLIENTES(@MENSAJE, @CODIGO)");

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

export const getClientByID = async (req, res) => {
  try {
    const { ID_CLIENTE } = req.params;
    const user = await pool.query("CALL OBTENER_CLIENTE(?,@MENSAJE, @CODIGO)", [
      ID_CLIENTE,
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

export const getSales = async (req, res) => {
  try {
    const venta = await pool.query("CALL OBTENER_VENTAS(@MENSAJE, @CODIGO)");

    const mensaje = JSON.parse(JSON.stringify(venta[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      usuario: JSON.parse(JSON.stringify(venta[0])),
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

export const getSaleByID = async (req, res) => {
  try {
    const { ID_VENTA } = req.params;
    const venta = await pool.query("CALL OBTENER_VENTA(?,@MENSAJE, @CODIGO)", [
      ID_VENTA,
    ]);

    const mensaje = JSON.parse(JSON.stringify(venta[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      usuario: JSON.parse(JSON.stringify(venta[0])),
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

export const getSalesDetail = async (req, res) => {
  try {
    const venta = await pool.query(
      "CALL OBTENER_DETALLE_VENTAS(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(venta[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      usuario: JSON.parse(JSON.stringify(venta[0])),
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

export const getSaleDetailByID = async (req, res) => {
  try {
    const { ID_VENTA } = req.params;
    const venta = await pool.query(
      "CALL OBTENER_DETALLE_VENTA(?,@MENSAJE, @CODIGO)",
      [ID_VENTA]
    );

    const mensaje = JSON.parse(JSON.stringify(venta[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      usuario: JSON.parse(JSON.stringify(venta[0])),
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

export const getSaleCompleteByID = async (req, res) => {
  try {
    const { ID_VENTA } = req.params;
    const venta = await pool.query(
      "CALL OBTENER_VENTA_COMPLETA(?,@MENSAJE, @CODIGO)",
      [ID_VENTA]
    );

    const mensaje = JSON.parse(JSON.stringify(venta[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      usuario: JSON.parse(JSON.stringify(venta[0])),
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
