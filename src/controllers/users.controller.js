import User from "../models/User";

export const createUser = (req, res) => {
  res.json("creatin User");
};

//Obtener Usuarios
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

//Obtener usuario por iD
export const getUserById = async (req, res) => {
  //Obtener un producto enviando el Id como parametro en el Request
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
};

//Eliminar usuario
export const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({mensaje: "success"});
  } catch (error) {
    res.status(401).json({error});
  }
};

//Actualizar usuario
export const updateUserById = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { new: true }
  );
  res.status(204).json(updatedUser);
};
