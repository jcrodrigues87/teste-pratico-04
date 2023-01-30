import Database from "../database/index";
import ContatoModel from "../models/ContatoModel";
import multer from "multer";

export default class ContatoRoute{


    constructor(app){
        this.app = app;
        this.database = new Database();
        this.connectDatabase();
        this.contato = null;
    }

    init(){
        this.upload = multer().none();
        this.salvar();
        this.listar();
    }

    async salvar(){

        this.app.post("/contato/incluir", this.upload, async (req, res) => {


            let {id, contador, departamento, email} = req.body;
            let prestadorId = 0;

            if (id === "" || contador === "" || departamento === "" || email === "") return res.status(400).json({message: "fill all the required fields"});
            if (id === null || contador === null || departamento === null || email === null) return res.status(400).json({message: "fill all the required fields"});

            try {
                prestadorId = parseInt(id);
                this.contato = new ContatoModel(prestadorId, contador, departamento, email);
                const savedContato = await this.database.saveContato(this.contato);
                if (savedContato === null) return res.status(400).json({message: "Cannot save your contato."});
                return res.json(savedContato);
            } catch (error) {
                console.log("Error saving the data. Try again later.");
                console.log(error);
                return res.status(500).json({message: "Cannot complete your request. Try again later."})
            }

        });

    }

    async listar(){
        this.app.post("/contato/listar", this.upload, async (req, res) => {

            let email = req.body.email;

            if (email === null || email === "") return res.status(400).json({message: "fill all the required fields"});

            try {
                let returnedContacts = await this.database.getContatos(email);
                console.log("Returned rows: ", returnedContacts.length);
                return res.json(returnedContacts);
            } catch (error) {
                console.log("Error saving the data. Try again later.");
                console.log(error);
                return res.status(500).json({message: "Cannot complete your request. Try again later."})
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