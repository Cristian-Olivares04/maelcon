import express from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import pkg from "../package.json";
import multer from "multer";

//importacion de los modulos
import authRoutes from "./routes/auth.routes";
import ModuleUsersRoutes from "./routes/module.users.routes";
import ModuleSalesRoutes from "./routes/module.sales.routes";
import ModuleInventoryRoutes from "./routes/module.inventory.routes";
import ModuleSuppliesRoutes from "./routes/module.supplies.routes";
import ModuleAdminRoutes from "./routes/module.admin.routes";
import ModuleHelpersRoutes from "./routes/module.helpers.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("pkg", pkg);

app.get("/", (req, res) => {
  res.json({
    author: app.get("pkg").author,
    version: app.get("pkg").version,
    project: app.get("pkg").name,
  });
});

app.use(morgan("dev"));

app.use("public/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/module/users", ModuleUsersRoutes);
app.use("/module/sales", ModuleSalesRoutes);
app.use("/module/inventory", ModuleInventoryRoutes);
app.use("/module/supplies", ModuleSuppliesRoutes);
app.use("/module/admin", ModuleAdminRoutes);
app.use("/module/helpers", ModuleHelpersRoutes);

export default app;
