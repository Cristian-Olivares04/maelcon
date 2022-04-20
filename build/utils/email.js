"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv").config({
  path: "./.env"
});

var nodemailer = require("nodemailer");

var sendEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, subject, text) {
    var transporter;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            transporter = nodemailer.createTransport({
              host: process.env.HOST_MAIL,
              port: process.env.PORT_MAIL,
              secure: true,
              auth: {
                user: process.env.USER,
                pass: process.env.PASS
              },
              tls: {
                rejectUnauthorized: false
              }
            });
            _context.next = 4;
            return transporter.sendMail({
              from: '"Maelcon" <maelconservices@gmail.com>',
              to: email,
              subject: subject,
              html: text
            });

          case 4:
            console.log(process.env.HOST_MAIL);
            _context.next = 12;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("Correo no enviado");
            console.log(_context.t0.message);
            console.log(process.env.PORT_MAIL, process.env.HOST_MAIL, process.env.PASS, process.env.USER);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function sendEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendEmail = sendEmail;