"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _package = _interopRequireDefault(require("../package.json"));

var _multer = _interopRequireDefault(require("multer"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _moduleUsers = _interopRequireDefault(require("./routes/module.users.routes"));

var _moduleSales = _interopRequireDefault(require("./routes/module.sales.routes"));

var _moduleInventory = _interopRequireDefault(require("./routes/module.inventory.routes"));

var _moduleSupplies = _interopRequireDefault(require("./routes/module.supplies.routes"));

var _moduleAdmin = _interopRequireDefault(require("./routes/module.admin.routes"));

var _moduleHelpers = _interopRequireDefault(require("./routes/module.helpers.routes"));

var _moduleReports = _interopRequireDefault(require("./routes/module.reports.routes"));

//importacion de los modulos
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.set("pkg", _package["default"]);
app.get("/", function (req, res) {
  res.json({
    author: app.get("pkg").author,
    version: app.get("pkg").version,
    project: app.get("pkg").name
  });
});
app.use((0, _morgan["default"])("dev"));
app.use("public/uploads", _express["default"]["static"]("uploads"));
app.use("/api/auth", _auth["default"]);
app.use("/module/users", _moduleUsers["default"]);
app.use("/module/sales", _moduleSales["default"]);
app.use("/module/inventory", _moduleInventory["default"]);
app.use("/module/supplies", _moduleSupplies["default"]);
app.use("/module/admin", _moduleAdmin["default"]);
app.use("/module/helpers", _moduleHelpers["default"]);
app.use("/module/reports", _moduleReports["default"]);
var _default = app;
exports["default"] = _default;