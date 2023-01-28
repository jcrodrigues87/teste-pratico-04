import fs, { readFile } from "fs";
import util from "util";

export default class FileUtil{
    
    constructor(){
        this.readFile = util.promisify(fs.readFile);
        this.writeFile = util.promisify(fs.writeFile);
        this.mkdir = util.promisify(fs.mkdir);
        this.unlink = util.promisify(fs.unlink);
    }

    async read(file){
        try {
            console.log("Reading file " + file);
            return await this.readFile(file, "utf8");
        } catch (error) {
            console.log("An error ocurred when reading file.");
            console.log(error);
            return null;
        }
    }

    async write(file, data){
        try {
            console.log("Writing file " + file);
            if (fs.existsSync(file)) console.log("File " + file + " already exists");
            if (fs.existsSync(file)) return "ok";
            return await this.writeFile(file, data, "utf8");
        } catch (error) {
            console.log("An error ocurred when writing the file.");
            console.log(error);
            return null;
        }
    }

    async create(folder){
        try {

            console.log("Creating folder " + folder);
            if (!fs.existsSync(folder)) console.log("Folder does not exists and will be created");
            if (!fs.existsSync(folder)) return await this.mkdir(folder);
            return "ok";
            
        } catch (error) {
            console.log("An error ocurred creating folder.");
            console.log(error);
            return null;
        }
    }

    async remove(file){
        try {
            console.log("Removing file " + file);
            return await this.unlink(file);
        } catch (error) {
            console.log("An error ocurred removing a file.");
            console.log(error);
            return null;
        }
    }

}