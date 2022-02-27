import app from "./app";
import './database';

app.listen(3000, () =>
  console.log("Ejecutando el server en el puerto 3000...")
);
