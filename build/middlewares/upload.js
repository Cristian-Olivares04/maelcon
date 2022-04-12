"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var storage = _multer["default"].diskStorage({
  destination: _path["default"].join(__dirname, '../public/uploads'),
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime() + _path["default"].extname(file.originalname));
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype.includes('jpeg') || file.mimetype.includes('png') || file.mimetype.includes('jpg')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter
});
exports.uploadIMG = upload.single('IMG');
exports.uploadUserIMG = upload.single('IMG_USUARIO');