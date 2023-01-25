import fs, { readFile } from "fs";
import util from "util";
import xml2js from "xml2js";

export default class FileUtil{
    
    constructor(){
        this.readFile = util.promisify(fs.readFile);
        this.writeFile = util.promisify(fs.writeFile);
        this.parser = util.promisify(new xml2js.Parser().parseString);
    }

    async read(file){
        try {
            console.log(file);
            return await this.readFile(file, "utf8");
        } catch (error) {
            console.log("An error ocurred when reading file.");
            console.log(error);
            return null;
        }
    }

    async write(file){
        try {
            return await this.readFile(file, "utf8");
        } catch (error) {
            console.log("An error ocurred when writing the file.");
            console.log(error);
            return null;
        }
    }

    async parseXML(xml){
        try {
            let minusculas = xml.toLowerCase();
            let xmlTratado = minusculas.replaceAll("nº", "numero").replaceAll(".", "").replaceAll(",", ".").replaceAll("-", "").trim();
            return await this.parser(xmlTratado);
        } catch (error) {
            console.log("Error parsing the XML");
            console.log(error);
            return null;
        }
    }

    async parseJson(json){
        try {
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(this.groupChildren(json));
            return xml;
        } catch (error) {
            console.log("Error parsing the JSON");
            console.log(error);
            return null;
        }
    }

}