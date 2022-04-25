import pool from "../databaseSQL";

export const createSupplier = async (req, res) => {
  try {
    const { RTN, NOMBRE_PROVEEDOR, TELEFONO_PROVEEDOR, CORREO_PROVEEDOR } =
      req.body;
    const objetos = await pool.query(
      "CALL CREAR_PROVEEDOR(?,?,?,?,@MENSAJE, @CODIGO)",
      [RTN, NOMBRE, TELEFONO, CORREO]
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

export const updateSupplier = async (req, res) => {
  try {
    const { ID_PROVEEDOR } = req.params;
    const { RTN, NOMBRE_PROVEEDOR, TELEFONO_PROVEEDOR, CORREO_PROVEEDOR } =
      req.body;
    const objetos = await pool.query(
      "CALL MODIFICAR_PROVEEDOR(?,?,?,?,?,@MENSAJE, @CODIGO)",
      [
        ID_PROVEEDOR,
        RTN,
        NOMBRE_PROVEEDOR,
        TELEFONO_PROVEEDOR,
        CORREO_PROVEEDOR,
      ]
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

export const createSupplyHeader = async (req, res) => {
  try {
    const { ID_USUARIO, ID_PROVEEDOR, ID_PAGO, OBSERVACION } = req.body;
    const objetos = await pool.query(
      "CALL ENCABEZADO_COMPRA(?,?,?,?,@MENSAJE, @CODIGO, @ID)",
      [ID_USUARIO, ID_PROVEEDOR, ID_PAGO, OBSERVACION]
    );

    const mensaje = JSON.parse(JSON.stringify(objetos[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
    });
  } catch (error) {
    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO, @ID as ID;"
    );

    res.status(401).json({
      error: error.message,
      mensaje: JSON.parse(JSON.stringify(mensaje)),
    });
  }
};

export const updateSupplyHeader = async (req, res) => {
  try {
    const { ID_COMPRA } = req.params;
    const { ID_PAGO, OBSERVACION } = req.body;
    const objetos = await pool.query(
      "CALL MODIFICAR_ENCABEZADO_COMPRA(?,?,?,@MENSAJE, @CODIGO)",
      [ID_COMPRA, ID_PAGO, OBSERVACION]
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

export const addSupply = async (req, res) => {
  try {
    const { ID_PRODUCTO, ID_COMPRA, PRECIO_UNITARIO, DESCRIPCION, CANTIDAD } =
      req.body;
    const objetos = await pool.query(
      "CALL AGREGAR_PRODUCTO_COMPRA(?,?,?,?,?,@MENSAJE, @CODIGO)",
      [ID_PRODUCTO, ID_COMPRA, PRECIO_UNITARIO, DESCRIPCION, CANTIDAD]
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

export const updateSupply = async (req, res) => {
  try {
    const { ID_PRODUCTO, ID_COMPRA, PRECIO_UNITARIO, DESCRIPCION, CANTIDAD } =
      req.body;
    const objetos = await pool.query(
      "CALL ACTUALIZAR_PRODUCTO_COMPRA(?,?,?,?,?,@MENSAJE, @CODIGO)",
      [ID_PRODUCTO, ID_COMPRA, PRECIO_UNITARIO, DESCRIPCION, CANTIDAD]
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

export const deleteSupply = async (req, res) => {
  try {
    const { ID_PRODUCTO, ID_COMPRA } = req.body;
    const objetos = await pool.query(
      "CALL ELIMINAR_PRODUCTO_COMPRA(?,?,@MENSAJE, @CODIGO)",
      [ID_PRODUCTO, ID_COMPRA]
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

export const processSupply = async (req, res) => {
  try {
    const { ID_COMPRA } = req.params;
    const { ID_USUARIO } = req.body;
    const objetos = await pool.query(
      "CALL PROCESAR_COMPRA(?,?,@MENSAJE, @CODIGO)",
      [ID_COMPRA, ID_USUARIO]
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

export const eliminateSupply = async (req, res) => {
  try {
    const { ID_COMPRA } = req.params;
    const { ID_USUARIO } = req.body;
    const objetos = await pool.query(
      "CALL ELIMINAR_COMPRA(?,?,@MENSAJE, @CODIGO)",
      [ID_COMPRA, ID_USUARIO]
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

export const getSupplies = async (req, res) => {
  try {
    const supplies = await pool.query(
      "CALL OBTENER_PRODUCTOS(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(supplies[0]));

    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      inventario: JSON.parse(JSON.stringify(supplies[0])),
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

export const getSupplyByID = async (req, res) => {
  try {
    const { ID_PRODUCTO } = req.params;
    const supply = await pool.query(
      "CALL OBTENER_PRODUCTO(?,@MENSAJE, @CODIGO)",
      [ID_PRODUCTO]
    );

    const mensaje = JSON.parse(JSON.stringify(supply[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      inventario: JSON.parse(JSON.stringify(supply[0])),
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

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await pool.query(
      "CALL OBTENER_PROVEEDORES(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(suppliers[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      proveedores: JSON.parse(JSON.stringify(suppliers[0])),
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

export const getSupplierByID = async (req, res) => {
  try {
    const { ID_PROVEEDOR } = req.params;
    const supplier = await pool.query(
      "CALL OBTENER_PROVEEDOR(?,@MENSAJE, @CODIGO)",
      [ID_PROVEEDOR]
    );

    const mensaje = JSON.parse(JSON.stringify(supplier[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      inventario: JSON.parse(JSON.stringify(supplier[0])),
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

export const getPurchases = async (req, res) => {
  try {
    const purchase = await pool.query(
      "CALL OBTENER_COMPRAS(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(purchase[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      proveedores: JSON.parse(JSON.stringify(purchase[0])),
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

export const getPurchaseByID = async (req, res) => {
  try {
    const { ID_COMPRA } = req.params;
    const purchase = await pool.query(
      "CALL OBTENER_COMPRA(?,@MENSAJE, @CODIGO)",
      [ID_COMPRA]
    );

    const mensaje = JSON.parse(JSON.stringify(purchase[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      inventario: JSON.parse(JSON.stringify(purchase[0])),
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

export const getProductData = async (req, res) => {
  try {
    const suppliers = await pool.query(
      "CALL OBTENER_PRODUCTOS_FULL(@MENSAJE, @CODIGO)"
    );

    const mensaje = JSON.parse(JSON.stringify(suppliers[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      proveedores: JSON.parse(JSON.stringify(suppliers[0])),
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

export const getProductDataByID = async (req, res) => {
  try {
    const { ID_PRODUCTO } = req.params;
    const supplier = await pool.query(
      "CALL OBTENER_PRODUCTOS_FULL_ID(?,@MENSAJE, @CODIGO)",
      [ID_PRODUCTO]
    );

    const mensaje = JSON.parse(JSON.stringify(supplier[0]));
    res.json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      inventario: JSON.parse(JSON.stringify(supplier[0])),
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

//Obtener detalles de la compra
export const getDetailsSupplyById = async (req, res) => {
  try {
    const { ID_COMPRA } = req.params;
    const details = await pool.query(
      "CALL OBTENER_DETALLE_COMPRA(?,@MENSAJE, @CODIGO)",
      [ID_COMPRA]
    );

    res.json({
      detalles: JSON.parse(JSON.stringify(details)),
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
