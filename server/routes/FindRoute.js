import Database from "../database/index";
import multer from "multer";

export default class FindRoute{

    constructor(app){
        this.app = app;
        this.database = new Database();
        this.connectDatabase();
    }

    async init(){
        this.upload = multer().none();
        this.findById();
        this.findByCnpj();
        this.findByRazao();
        this.findByEmail();
        this.find();
    }

    async findById(){
        this.app.post("/find/id", this.upload, async (req, res) => {
            
            const id = req.body.id;

            try {
                
                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")
    
                let foundClient = await this.database.findById(id);
    
                if(foundClient == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let jsonClient = foundClient.toJSON();

                if(jsonClient == null) return res.status(500).send("Cannot complete your request. Try again later.")
    
                return res.send(jsonClient);

            } catch (error) {
                console.log("An error ocurred when trying to search by id.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }

        });
    }

    async findByCnpj(){
        this.app.post("/find/cnpj", this.upload, async (req, res) => {
            const cnpj = req.body.cnpj;

            try {

                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let foundClient = await this.database.findByCnpj(cnpj);

                if(foundClient == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let jsonClient = foundClient;

                if(jsonClient == null) return res.status(500).send("Cannot complete your request. Try again later.")
    
                return res.send(jsonClient);
            } catch (error) {
                console.log("An error ocurred when searching for cnpj.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
            
        });
    }

    async findByRazao(){
        this.app.post("/find/razao", this.upload, async (req, res) => {
            const razao = req.body.razao;

            try {

                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let foundClient = await this.database.findByRazao(razao);

                if(foundClient == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let jsonClient = foundClient;

                if(jsonClient == null) return res.status(500).send("Cannot complete your request. Try again later.")
    
                return res.send(jsonClient);
            } catch (error) {
                console.log("An error ocurred when searching for razao.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
            
        });
    }

    async findByEmail(){
        this.app.post("/find/email", this.upload, async (req, res) => {
            const email = req.body.email;

            try {

                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let foundClient = await this.database.findByEmail(email);

                if(foundClient == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let jsonClient = foundClient;

                if(jsonClient == null) return res.status(500).send("Cannot complete your request. Try again later.")
    
                return res.send(jsonClient);
            } catch (error) {
                console.log("An error ocurred when searching for email.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
            
        });
    }

    async find(){
        this.app.post("/find", this.upload, async (req, res) => {
            
            try {
                if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

                let foundClients = await this.database.findAll();

                if(foundClients == null) return res.status(500).send("Cannot complete your request. Try again later.")

                console.log(foundClients);

                return res.send(foundClients);
            } catch (error) {
                console.log("An error ocurred when trying to search by birthday");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.") 
            }

        });
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