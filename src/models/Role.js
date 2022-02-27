import { Schema, model } from "mongoose";

export const Roles =  ["user", "admin", "driver"];

const roleSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);

export default model("Role", roleSchema);
