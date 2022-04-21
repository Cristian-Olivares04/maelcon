import pool from "../databaseSQL";
var cloudinary_services = require("../utils/cloudinary_services");

export const createCategory = async (req, res) => {
  try {
    const { CATEGORIA, DESCRIPCION } = req.body;
    await pool.query("CALL CREAR_CATEGORIA(?,?,@MENSAJE, @CODIGO)", [
      CATEGORIA,
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

export const updateCategory = async (req, res) => {
  try {
    const { ID_CATEGORIA } = req.params;
    const { CATEGORIA, DESCRIPCION } = req.body;
    await pool.query("CALL MODIFICAR_CATEGORIA(?,?,?,@MENSAJE, @CODIGO)", [
      ID_CATEGORIA,
      CATEGORIA,
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

export const createProduct = async (req, res) => {
  try {
    const {
      ID_PROVEEDOR,
      NOMBRE,
      MARCA,
      DESCRIPCION,
      IMG,
      ESTADO,
      ID_CATEGORIA,
    } = req.body;

    let img;
    //Guarda foto
    if(req.file){
      img = await cloudinary_services.uploadImage(req.file.path, 'Maelcon/Productos');
      console.log(img);
    }else{
      img = 'https://res.cloudinary.com/maelcon/image/upload/v1649628573/Maelcon/Productos/images_yucxd8.png';
    }

    await pool.query("CALL CREAR_PRODUCTO(?,?,?,?,?,?,?,@MENSAJE, @CODIGO)", [
      ID_PROVEEDOR,
      NOMBRE,
      MARCA,
      DESCRIPCION,
      img,
      ESTADO,
      ID_CATEGORIA,
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

export const updateProduct = async (req, res) => {
  try {
    const { ID_PRODUCTO } = req.params;
    const {
      ID_PROVEEDOR,
      NOMBRE,
      MARCA,
      DESCRIPCION,
      IMG,
      ESTADO,
      ID_CATEGORIA,
    } = req.body;
    
    let img;
    //Guarda foto
    if(req.file){
      img = await cloudinary_services.uploadImage(req.file.path, 'Maelcon/Productos');
      console.log(img);
    }else{
      const productoAct = await pool.query(
        "CALL OBTENER_PRODUCTO(?, @MENSAJE, @CODIGO)",
        [ID_PRODUCTO]
      );
      console.log(productoAct[0][0].IMG_PRODUCTO);
      img = productoAct[0][0].IMG_PRODUCTO;
    }

    await pool.query(
      "CALL MODIFICAR_PRODUCTO(?,?,?,?,?,?,?,?,@MENSAJE, @CODIGO)",
      [
        ID_PRODUCTO,
        ID_PROVEEDOR,
        NOMBRE,
        MARCA,
        DESCRIPCION,
        img,
        ESTADO,
        ID_CATEGORIA,
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

export const updateAvailable = async (req, res) => {
  try {
    const { ID_INVENTARIO } = req.params;
    const { PRECIO_VENTA, ESTADO } = req.body;
    await pool.query("CALL MODIFICAR_INVENTARIO(?,?,?,@MENSAJE, @CODIGO)", [
      ID_INVENTARIO,
      PRECIO_VENTA,
      ESTADO,
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

export const updateExpireDate = async (req, res) => {
  try {
    const { ID_KARDEX } = req.params;
    const { FECHA_VENCIMIENTO } = req.body;
    await pool.query("CALL ACTUALIZAR_KARDEX(?,?,@MENSAJE, @CODIGO)", [
      ID_KARDEX,
      FECHA_VENCIMIENTO,
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

export const getInventory = async (req, res) => {
  try {
    const inventory = await pool.query(
      "CALL OBTENER_INVENTARIO(@MENSAJE, @CODIGO)"
    );

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
      inventario: JSON.parse(JSON.stringify(inventory[0])),
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

export const getInventoryByProduct = async (req, res) => {
  try {
    const inventory = await pool.query(
      "CALL OBTENER_INVENTARIO_PROD(@MENSAJE, @CODIGO)"
    );

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
      inventario: JSON.parse(JSON.stringify(inventory[0])),
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

export const getCategories = async (req, res) => {
  try {
    const categories = await pool.query(
      "CALL OBTENER_CATEGORIAS(@MENSAJE, @CODIGO)"
    );

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
      inventario: JSON.parse(JSON.stringify(categories[0])),
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

export const getCategoryByID = async (req, res) => {
  try {
    const { ID_CATEGORIA } = req.params;
    const categories = await pool.query(
      "CALL OBTENER_CATEGORIA(?,@MENSAJE, @CODIGO)",
      [ID_CATEGORIA]
    );

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
      inventario: JSON.parse(JSON.stringify(categories[0])),
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

export const getKardex = async (req, res) => {
  try {
    const kardex = await pool.query("CALL OBTENER_KARDEX(@MENSAJE, @CODIGO)");

    const mensaje = await pool.query(
      "SELECT @MENSAJE as MENSAJE, @CODIGO as CODIGO;"
    );
    res.json({
      mensaje: JSON.parse(JSON.stringify(mensaje)),
      inventario: JSON.parse(JSON.stringify(kardex[0])),
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
