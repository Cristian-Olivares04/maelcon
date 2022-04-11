import pool from "./databaseSQL";

const parameters = pool.query(
    "CALL OBTENER_PARAMETROS(@MENSAJE, @CODIGO)"
  );

export default {
  database: {
    host: "localhost",
    user: "root",
    database: "db_maelcon_5",
    password: "rodriguez1999",
  },
  email: {
    HOST_MAIL: 'smtp.gmail.com',
    USER: 'maelconservices',
    PASS: 'hbxnssxpesbwxkbr',
    SERVICE: 'gmail',
    PORT_MAIL: '465',
    BOOL_PORT: true
  },
  cloudinary: {
    CLOUDINARY_CLOUD_NAME: 'maelcon',
    CLOUDINARY_API_KEY: '588467179963663',
    CLOUDINARY_API_SECRET: 'RcaTIK2zxmc77S_WzwAP067GYcM'
  }  
};