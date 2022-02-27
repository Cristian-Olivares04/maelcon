import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const singUp = async (req, res) => {
  const {
    username,
    email,
    password,
    roles,
    firstName,
    lastName,
    DNI,
    birthDate,
    phone,
    city,
    department,
    licensePlate,
    address,
    status,
    statusDetail,
  } = req.body;

  console.log(req.body);

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
    firstName,
    lastName,
    DNI,
    birthDate,
    phone,
    city,
    department,
    licensePlate,
    address,
    status,
    statusDetail
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });

  console.log(newUser);

  res.json({ token: token, user: savedUser });
};

export const singIn = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );

  if (!userFound) {
    return res.status(400).json({ mensaje: "usuario no encontrado" });
  }

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ mensaje: "Contrasena erronea", token: null });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  userFound.password ='';
  res.json({ token: token, user: userFound });
};
