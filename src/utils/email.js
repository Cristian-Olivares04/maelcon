require("dotenv").config({ path: "./.env" });
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_MAIL,
      port: process.env.PORT_MAIL,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
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
    console.log(process.env.HOST_MAIL);
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
