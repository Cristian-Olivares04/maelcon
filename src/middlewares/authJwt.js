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
    console.log(user);

    if (!user)
      return res
        .status(404)
        .json({ mensaje: "El usuario no ha sido encontrado" });

    next();
  } catch (error) {
    res.status(404).json({ mensaje: "Acceso no autorizado" });
  }
};
