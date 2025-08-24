import multer from "multer";
import path from "path";

const createUploader = ({
  destination = "uploads/",
  allowedTypes = [],
  maxSizeMB = 5,
}) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (allowedTypes.length === 0) {
      return cb(null, true);
    }

    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${allowedTypes} files are allowed!`), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
  });
};

export default createUploader;
