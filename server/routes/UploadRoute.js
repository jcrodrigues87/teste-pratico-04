import formidable from "formidable";
import path from "path";
import multer from "multer";
import FileUtil from "../util/FileUtil";

export default class UploadRoute{

    constructor(app){
        this.app = app;
        this.upload = multer();
        this.fileUtil = new FileUtil();
    }

    init(){
        this.salvar();
    }

    async salvar(){
        try {
            this.app.post("/upload", this.upload.array("files"), async (req, res) => {

                console.log(req);
                
                let id = req.body.id;
                let basePath = path.join(__dirname, "..", "public", id);
                
                this.fileUtil.create(basePath);
                
                req.files.forEach(async file => {

                    let newFileName = path.join(basePath, file.originalname);
                    let oldPath = file.path;

                    let bytesRead = await this.fileUtil.read(oldPath);

                    if (bytesRead === null) res.status(500).json({message: "cannot complete your request"});

                    let bytesWritten = this.fileUtil.write(newFileName, bytesRead);

                    if (bytesWritten === null) res.status(500).json({message: "cannot complete your request"});

                    this.fileUtil.remove(oldPath);
                });

                console.log(req.body.id);
                console.log(req.files);
                return res.json({files: req.files, body: req.body});
            });
        } catch (error) {
            console.log(error);
        }
    }

}