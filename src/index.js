require("dotenv").config({ path: "./variables.env" });
import app from "./app";
import "core-js/stable";
import "regenerator-runtime/runtime";

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () =>
  console.log("Ejecutando el server en el puerto ", port)
);

app.on("clientError", (err, socket) => {
  console.log(err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});
