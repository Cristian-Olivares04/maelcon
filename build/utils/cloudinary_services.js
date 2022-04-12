"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

require("dotenv").config({
  path: "./variables.env"
});

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var uploadImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path_image, ubication) {
    var infoCloud;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return cloudinary.v2.uploader.upload(path_image, {
              folder: ubication
            });

          case 3:
            infoCloud = _context.sent;

            _fsExtra["default"].unlink(path_image);

            return _context.abrupt("return", infoCloud.url);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log("error al subir la imagen");

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function uploadImage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadImage = uploadImage;