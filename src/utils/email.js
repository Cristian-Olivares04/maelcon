require("dotenv").config({ path: "../.env" });
const nodemailer = require("nodemailer");
import pool from "../databaseSQL";

const sendEmail = async (email, subject, text) => {
  try {
    const parameters = await pool.query(
      "CALL OBTENER_PARAMETROS_EMAIL(@MENSAJE, @CODIGO);"
    );
    const data = JSON.parse(JSON.stringify(parameters[0]));
    const transporter = nodemailer.createTransport({
      host: data[0]["VALOR"],
      port: data[4]["VALOR"],
      secure: data[5]["VALOR"],
      auth: {
        user: data[1]["VALOR"],
        pass: data[2]["VALOR"],
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: '"Maelcon" <maelconservices@gmail.com>',
      to: email,
      subject: subject,
      html: text,
    });
  } catch (error) {
    console.log("Correo no enviado");
    console.log(error.message);
    console.log(
      process.env.PORT_MAIL,
      process.env.HOST_MAIL,
      process.env.PASS,
      process.env.USER
    );
  }
};

exports.sendEmail = sendEmail;
