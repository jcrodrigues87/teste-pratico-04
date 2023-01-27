import Database from "../database/index";
import ContatoModel from "../models/ContatoModel";

export default class ContatoRoute{


    constructor(app){
        this.app = app;
        this.database = new Database();
        this.connectDatabase();
        this.contato = null;
    }

    init(){
        this.salvar();
        this.listar();
    }

    async salvar(){

        this.app.post("/contato/incluir", async (req, res) => {


            let {id, contador, departamento, email} = req.body;

            if (id === "" || contador === "" || departamento === "" || email === "") return res.status(400).json({message: "fill all the required fields"});
            if (id === null || contador === null || departamento === null || email === null) return res.status(400).json({message: "fill all the required fields"});

            try {
                this.contato = new ContatoModel(id, contador, departamento, email);
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
        this.app.post("/contato/listar", async (req, res) => {

            let id = req.body.id;

            if (id === null || id === "") return res.status(400).json({message: "fill all the required fields"});

            try {
                let returnedContacts = await this.database.getContatos(id);
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