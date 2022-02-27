import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["auth-token"];

    if (!token) {
      return res.status(403).json({ mensaje: "No se ha enviado ningun token" });
    }

    const decoded = jwt.verify(token, config.SECRET);

    req.userId = decoded.id;

    const user = await User.findById(req.userId);

    if (!user)
      return res
        .status(404)
        .json({ mensaje: "El usuario no ha sido encontrado" });

    next();
  } catch (error) {
    res.status(404).json({ mensaje: "Acceso no autorizado" });
  }
};

export const isDriver = async (req, res, next) => {
  // encontramos el usuario
  const user = await User.findById(req.userId);
  //sacamos los roles del usuario
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();S
      return;
    }
  }
  return res.status(403).json({ mensaje: "Requiere driver" });
};

export const isAdmin = async (req, res, next) => {
  // encontramos el usuario
  
  const user = await User.findById(req.userId);
  //sacamos los roles del usuario
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ mensaje: "Requiere admin" });
};
