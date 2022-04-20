"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

require("core-js/stable");

require("regenerator-runtime/runtime");

require("dotenv").config({
  path: "./variables.env"
});

var host = process.env.HOST || "0.0.0.0";
var port = process.env.PORT || 3000;

_app["default"].listen(port, host, function () {
  return console.log("Ejecutando el server en el puerto ", port);
});

_app["default"].on("clientError", function (err, socket) {
  console.log(err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});