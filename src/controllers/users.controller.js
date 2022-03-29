import User from "../models/User";
import bcrypt from "bcryptjs";
import pool from "../databaseSQL";

export const createUser = async (req, res) => {
  await pool.query("INSERT INTO tbl_personas set ?", [req.body]);
  res.json({ message: "El usuario ha sido agregado correctamente" });
};
//MySQL

export const getUsersSQL = async (req, res) => {
  const usuarios = await pool.query("SELECT * FROM tbl_personas");
  res.json(JSON.parse(JSON.stringify(usuarios)));
};

export const getUserByIdSQL = async (req, res) => {
  const { ID_PERSONA } = req.params;
  const id = parseInt(ID_PERSONA, 10);
  const usuario = await pool.query(
    "SELECT * FROM tbl_personas WHERE ID_PERSONA = ?",
    [id]
  );
  res.json(JSON.parse(JSON.stringify(usuario)));
};

export const updateUserByIdSQL = async (req, res) => {
  const { ID_PERSONA } = req.params;
  const id = parseInt(ID_PERSONA, 10);
  await pool.query("UPDATE tbl_personas set ? WHERE ID_PERSONA = ?", [
    req.body,
    id,
  ]);
  res.json({ message: "El usuario ha sido actualizado" });
};

export const deleteUserByIdSQL = async (req, res) => {
  const { ID_PERSONA } = req.params;
  const id = parseInt(ID_PERSONA, 10);
  await pool.query("DELETE FROM tbl_personas WHERE ID_PERSONA = ?", [id]);

  res.json({ message: "El usuario ha sido eliminado" });
};
// Mongo DB
//Obtener Usuarios

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};
