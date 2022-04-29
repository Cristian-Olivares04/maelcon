import pool from "../databaseSQL";

export const getSalesReport = async (req, res) => {
    try {
      const {FECHA_INICIO, FECHA_FIN} = req.body;

      const information = await pool.query(
        "CALL OBTENER_VENTAS_FECHAS(?,?,@MENSAJE, @CODIGO);",
        [FECHA_INICIO, FECHA_FIN]
      );
      const mensaje = JSON.parse(JSON.stringify(information[0]));
  
      res.status(200).json({
        mensaje: [
          { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
        ],
        data: JSON.parse(JSON.stringify(information)),
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


  export const getShoppingReport = async (req, res) => {
    try {
      const {FECHA_INICIO, FECHA_FIN} = req.body;

      const information = await pool.query(
        "CALL OBTENER_COMPRAS_FECHAS(?,?,@MENSAJE, @CODIGO);",
        [FECHA_INICIO, FECHA_FIN]
      );
      const mensaje = JSON.parse(JSON.stringify(information[0]));
  
      res.status(200).json({
        mensaje: [
          { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
        ],
        data: JSON.parse(JSON.stringify(information)),
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

  export const getBinnacleReport = async (req, res) => {
    try {
      const {FECHA_INICIO, FECHA_FIN} = req.body;

      const information = await pool.query(
        "CALL OBTENER_BITACORA_FECHAS(?,?,@MENSAJE, @CODIGO);",
        [FECHA_INICIO, FECHA_FIN]
      );
      const mensaje = JSON.parse(JSON.stringify(information[0]));
  
      res.status(200).json({
        mensaje: [
          { MENSAJE: mensaje[0]["MENSAJE"], CODIGO: mensaje[0]["CODIGO"] },
        ],
        data: JSON.parse(JSON.stringify(information)),
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