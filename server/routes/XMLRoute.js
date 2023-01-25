import FileUtil from "../util/FileUtil";
import path from "path";
import UserModel from "../models";
import DatabaseUtil from "../database";
import js2xmlparser from "js2xmlparser";

export default class XMLRoute{

    constructor(app){
        this.app = app;
        this.fileUtil = new FileUtil();
        this.databaseUtil = new DatabaseUtil();
    }

    async init(){
        this.export();
        this.import();
    }

    async export(){
        this.app.get("/xml/export", async (req, res) => {
            try {
                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")
                let returnedRows = await this.databaseUtil.getAllRows();

                if (returnedRows == null) return res.status(500).send("Cannot complete your request. Try again later.")

                // let xml = this.fileUtil.parseJson(returnedRows);

                console.log(returnedRows);
                return res.send(returnedRows);
            } catch (error) {
                
            }
        });
    }

    async import(){
        this.app.get("/xml/import", async (req, res) => {

            let savedUsers = 0;

            try {
                let filePath = path.join(__dirname, "..", "public", "clientes.xml");
                let result = await this.fileUtil.read(filePath);
                let parsed = await this.fileUtil.parseXML(result);
                let registros = parsed.registros.item;
                let registroAtual = 0;
                let totalRegistros = 0;
                
                

                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

                totalRegistros = registros.length;

                for (let i = 0; i < registros.length; i++) {
                    const registro = registros[i];
                    let salary = 0;
                    let birthdayDate = new Date();

                    salary = parseFloat(registro.salario[0]);
                    birthdayDate = new Date(registro.datadenascimento[0]);
                    registroAtual = i + 1;

                    if (!birthdayDate instanceof Date || isNaN(birthdayDate)){
                        birthdayDate = new Date()
                    }
                    

                    const user = new UserModel(
                        registro.nome[0],
                        registro.cpf[0],
                        registro.estadocivil[0],
                        registro.pai[0],
                        registro.mae[0],
                        registro.conjuge[0],
                        registro.rg[0],
                        salary,
                        registro.especie[0],
                        registro.titulodeeleitor[0],
                        registro.sexo[0],
                        registro.celular[0],
                        registro.cep[0],
                        registro.endereco[0],
                        registro.complemento[0],
                        registro.numero[0],
                        registro.bairro[0],
                        registro.email[0],
                        registro.cidade[0],
                        birthdayDate
                    );


                    let savedUser = this.saveUser(user);

                    if (savedUser != null){
                        console.log("User " + registroAtual.toString() + " of " + totalRegistros.toString() + " saved successfuly.");
                        savedUsers++;
                    }else{
                        console.log("User " + registroAtual.toString() + "of " + totalRegistros.toString() + " cannot be saved.");
                    }
                    
                }

            } catch (error) {
                console.log("Error reading/parsing the xml file or saving the user.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again.")
            }

            return res.send(savedUsers.toString() + " users saved.");
        });
    }

    async connectDatabase(){

        try {
            this.databaseUtil.connect();
            // await this.databaseUtil.authenticate();
            await this.databaseUtil.setModel();
            await this.databaseUtil.sync();
            return "ok";
        } catch (error) {
            console.log("An error ocurred when syncing the database.");
            console.log(error);
            return null;
        }
    }

    async saveUser(user){
        return await this.databaseUtil.save(user);
    }
}