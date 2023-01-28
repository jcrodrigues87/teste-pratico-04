import express from "express";
import dotenv from "dotenv";
import Route from "./routes";
import cors from "cors";

const app = express();
// app.use(express.json());
dotenv.config();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

const PORT = process.env.SERVER_PORT || 3000;
const routes = new Route(app);
routes.router();

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

