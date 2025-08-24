import multer from "multer";

export const storage = multer.diskStorage({
  destination: "uploads/image", //its define folder name
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + file.originalname); //its define file name to save on destination, like a custom file name
  },
});
