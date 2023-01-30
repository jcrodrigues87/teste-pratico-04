import PrestadorRoute from "./PrestadorRoute";
import FindRoute from "./FindRoute";
import Contato from "./ContatoRoute";
import UploadRoute from "./UploadRoute";

export default class Route{

    constructor(app){
        this.app = app;
        
        this.prestadorRoute = new PrestadorRoute(this.app);
        this.findRoute = new FindRoute(this.app);
        this.contatoRoute = new Contato(this.app);
        this.uploadRoute = new UploadRoute(this.app);
    }

    router(){
        this.home();
        this.prestadorRoute.init();
        this.findRoute.init();
        this.contatoRoute.init();
        this.uploadRoute.init();
    }

    home(){
        this.app.get("/", (req, res) => {
            res.status(404).send("Nothing here. Go back.")
        })
    }

}