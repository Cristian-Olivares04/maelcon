import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
  });

  const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);
    }
};

let upload = multer({ storage: storage, fileFilter: fileFilter,});

exports.uploadIMG = upload.single('IMG');
exports.uploadUserIMG = upload.single('IMG_USUARIO');