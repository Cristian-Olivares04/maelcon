import pool from "../databaseSQL";

export const updateHelpData = async (req, res) => {
  try {
    const { ID_INFO } = req.params;
    const { TITULO, ENLACE, ESTADO } = req.body;
    const objetos = await pool.query(
      "CALL ACTUALIZAR_INFORMACION_AYUDA(?,?,?,?,@MENSAJE, @CODIGO);",
      [ID_INFO, TITULO, ENLACE, ESTADO]
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

export const createHelpData = async (req, res) => {
  try {
    const { TITULO, ENLACE, ESTADO } = req.body;
    const objetos = await pool.query(
      "CALL CREAR_INFORMACION_AYUDA(?,?,?,@MENSAJE, @CODIGO);",
      [TITULO, ENLACE, ESTADO]
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

export const deleteHelpData = async (req, res) => {
  try {
    const { ID_INFO } = req.params;
    const objetos = await pool.query(
      "CALL ELIMINAR_INFORMACION_AYUDA(?,@MENSAJE, @CODIGO);",
      [ID_INFO]
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

export const getHelpData = async (req, res) => {
  try {
    const information = await pool.query(
      "CALL OBTENER_INFORMACION(@MENSAJE, @CODIGO);"
    );
    const mensaje = JSON.parse(JSON.stringify(information[0]));

    res.status(200).json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      data: JSON.parse(JSON.stringify(information))[0],
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

export const getHelpActiveData = async (req, res) => {
  try {
    const information = await pool.query(
      "CALL OBTENER_INFORMACION_ACTIVA(@MENSAJE, @CODIGO);"
    );
    console.log(information);
    const mensaje = JSON.parse(JSON.stringify(information[0]));

    res.status(200).json({
      mensaje: [
        { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
      ],
      data: JSON.parse(JSON.stringify(information))[0],
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
