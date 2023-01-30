import Database from "../database/index";
import Prestador from "../models/index";
import multer from "multer";

export default class ClientRoute{

    constructor(app){
        this.app = app;
        this.database = new Database();
        this.connectDatabase();
        this.prestador = null;
        this.upload = multer().none();
    }

    init(){
        this.insert();
        this.update();
        this.delete();
    }

    async insert(){

        this.app.post("/prestador", this.upload, async (req, res) => {

            let dataAbertura = new Date();

            console.log(req.body);

            const {
                cnpj,
                razao,
                abertura,
                telefone,
                email,
                cep,
                endereco
            } = req.body;

            
            
            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")
            
            try {
                
                let dataAbertura = new Date(abertura);
                
                this.prestador = new Prestador(
                    cnpj,
                    razao,
                    dataAbertura,
                    telefone,
                    email,
                    cep,
                    endereco
                    );
                let savedPrestador = await this.database.save(this.prestador);

                if (savedPrestador === null) return res.status(400).json({message: "Cannot save your prestador."});

                return res.json(savedPrestador);
            } catch (error) {
                console.log("Error saving the data. Try again later.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
        });
    }

    async update(){
        this.app.put("/prestador/alterar", this.upload, async (req, res) => {

            let dataAbertura = new Date();

            const {
                cnpj,
                razao,
                abertura,
                telefone,
                email,
                cep,
                endereco
            } = req.body;            
            
            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

            try {
                
                let dataAbertura = new Date(abertura);
                
                this.prestador = new Prestador(
                    cnpj,
                    razao,
                    dataAbertura,
                    telefone,
                    email,
                    cep,
                    endereco
                );

                let updatedRows = await this.database.update(this.prestador);
                
                if (updatedRows.toString() === "0") return res.status(500).send("Cannot complete your request. Try again later.") 

                // return res.send(updatedRows.toString() + " rows update successfully.");
                return res.json({message: updatedRows.toString() + " rows updated successfully."});
                
            } catch (error) {
                console.log("Error saving the data. Try again later.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
        });
    }

    async delete(){
        this.app.put("/prestador/excluir", this.upload, async (req, res) => {

            let dataAbertura = new Date();

            const {
                cnpj,
                razao,
                abertura,
                telefone,
                email,
                cep,
                endereco
            } = req.body;

            
            
            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

            try {

                let dataAbertura = new Date(abertura);
                
                this.prestador = new Prestador(
                    cnpj,
                    razao,
                    dataAbertura,
                    telefone,
                    email,
                    cep,
                    endereco
                );

                let rowsAffected = await this.database.delete(this.prestador);
                if(rowsAffected == 0) res.status(500).send("Cannot complete your request. Try again.");
                return res.json({message: rowsAffected.toString() + " rows affected."})

            } catch (error) {
                console.log("An error ocurred trying to delete the data.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again.");
            }
        })
    }

    async connectDatabase(){

        try {
            this.database.connect();
            // await this.database.authenticate();
            await this.database.setModel();
            await this.database.sync();
            return "ok";
        } catch (error) {
            console.log("An error ocurred when syncing the database.");
            console.log(error);
            return null;
        }
    }
}