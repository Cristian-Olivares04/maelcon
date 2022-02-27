import { Roles } from "../models/Role";
import User from "../models/User";

export const checkRoles = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!Roles.includes(req.body.roles[i])) {
        return res
          .status(403)
          .json({
            mensaje: `El role ${req.body.roles[i]} no existe en la base de datos`,
          });
      }
    }
  }
  next();
};

export const checkUser = async (req, res, next) => {
    const user = await User.findOne({email:req.body.email});

    if (user) return res.status(403).json({mensaje: `El user con el correo ${req.body.email} ya existe`});

    next();
}