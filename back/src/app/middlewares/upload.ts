import multer from "multer";
import path from "path";
import util from "util";
import fs from "fs";

const basePath = "src/public/";
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!fs.existsSync(`${basePath}/${req.params.email}`)) {
      fs.mkdirSync(`${basePath}/${req.params.email}`);
    }
    callback(null, `${basePath}/${req.params.email}`);
  },
  filename: (req, file, callback) => {
    let filename = file.originalname.replace(/\s+/g, "");
    callback(null, filename);
  },
});
const upload = multer({ storage: storage }).array("files");
export const uploadFilesMiddleware = util.promisify(upload);
