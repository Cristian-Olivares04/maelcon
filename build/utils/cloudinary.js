"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

require("dotenv").config({
  path: "../.env"
});

var cloudinary = require('cloudinary');

var _require = require("regenerator-runtime"),
    async = _require.async;

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

            _fsExtra["default"].unlink(req.file.path);

            console.log(process.env.CLOUDINARY_CLOUD_NAME);
            return _context.abrupt("return", infoCloud.url);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log("error al subir la imagen");

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function uploadImage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadImage = uploadImage;