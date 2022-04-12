import jwt from "jsonwebtoken";
import config from "../config";
import pool from "../databaseSQL";

export const verifyTokenSQL = async (req, res, next) => {
  try {
    const token = req.headers["auth-token"];

    if (!token) {
      return res.status(403).json({ mensaje: "No se ha enviado ningun token" });
    }

    const decoded = jwt.verify(token, config.SECRET);

    req.userId = decoded.id;

    //buscar en la base de datos
    const user = await pool.query(
      "SELECT * FROM tbl_ms_usuario WHERE ID_USUARIO = ?",
      [req.userId]
    );

    if (!user)
      return res
        .status(404)
        .json({ mensaje: "El usuario no ha sido encontrado", codigo: 404 });

    next();
  } catch (error) {
    res.status(404).json({ mensaje: "Acceso no autorizado", codigo: 2 });
  }
};

export const verifyAuth = (module, operation) => {
  try {
    return async (req, res, next) => {
      const id = req.userId;
      const permisos = await pool.query(
        "CALL OBTENER_PERMISOS_RUTA(?,?,?,@MENSAJE, @CODIGO)",
        [id, module, operation]
      );
      const authValue = Object.values(
        JSON.parse(JSON.stringify(permisos))[0][0]
      );
      if (authValue[0] === 0) {
        return res.status(301).json({
          mensaje:
            "No se cuentan con los permisos suficientes para acceder a la ruta",
        });
      }
      next();
    };
  } catch (error) {
    res.json({
      message: "Acceso no autorizado, requiere permisos adicionales.",
      error: error,
    });
  }
};
