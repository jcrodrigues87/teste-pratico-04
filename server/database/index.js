import { DataTypes, Sequelize, Op } from "sequelize";
import Prestador from "../models";

export default class Database{

    constructor(){
        this.sequelize = null;
        this.host = process.env.BD_HOST;
        this.port = process.env.BD_PORT;
        this.user = process.env.BD_USER;
        this.password = process.env.BD_PASSWORD;
        this.database = process.env.BD_DATABASE;
        this.model = null;
        this.connection = null;
        this.prestador = new Prestador();
    }

    connect(){
        this.sequelize = new Sequelize(this.database, this.user, this.password, {
            host: this.host,
            dialect: "mysql"
        });
    }

    async authenticate(){
        this.connect();
        try {
            await this.sequelize.authenticate();
        } catch (error) {
            console.log("An error ocurred when authenticating to database.");
            console.log(error);
        }
    }

    async setModel(){

        try {
            this.model = this.sequelize.define("Prestadore", {
                id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
                cnpj: {type: DataTypes.STRING, allowNull: false},
                razao: {type: DataTypes.STRING, allowNull: false},
                dataAbertura: {type: DataTypes.DATEONLY, allowNull: false},
                telefone: {type: DataTypes.STRING, allowNull: false},
                email: {type: DataTypes.STRING, allowNull: false},
                cep: {type: DataTypes.STRING, allowNull: false},
                endereco: {type: DataTypes.STRING, allowNull: false}
            })
        } catch (error) {
            console.log("Error when creating the database model.");
            console.log(error);
        }
    }

    async sync(){
        try {
            this.model.sync();
        } catch (error) {
            console.log("Error creating the database.");
            console.log(error);
        }
    }

    async close(){
        await this.sequelize.close();
    }

    async save(prestador){
        console.log(prestador);
        try {
            this.prestador = prestador;
            return await this.model.create(this.prestador);
        } catch (error) {
            console.log("An error ocurred when trying to save the data.");
            console.log(error);
            return null;
        }
    }

    async getInstance(prestador){
        try {
            
            const returnedUser =  await this.model.findOne({where: {
                cnpj: prestador.cnpj
            }});
            return returnedUser;
        } catch (error) {
            console.log("An error ocurred getting the data");
            console.log(error);
            return null;
        }
    }

    async update(prestador){
        try {
            const affectedRows = await this.model.update(
                {
                    email: prestador.email,
                    razao: prestador.razao
                },
                {
                    where: {
                        cnpj: this.prestador.cnpj
                    }
                }
            );
            console.log("Affected Rows:");
            console.log(affectedRows);
            return affectedRows;
        } catch (error) {
            console.log("An error ocurred updating the data.");
            console.log(error);
            return null;
        }
    }

    async delete(prestador){
        try {
            return await this.model.destroy({
                where: {
                    cnpj: prestador.cnpj
                }
            });
        } catch (error) {
            console.log("An error ocurred trying to delete the data.");
            console.log(error);
        }
    }

    async findById(id){
        try {
            let foundClient =  await this.model.findByPk(id);
            console.log(foundClient);
            return foundClient;
        } catch (error) {
            console.log("An error ocurred finding the data by id");
            console.log(error);
            return null;
        }
    }

    async findByCnpj(cnpj){
        try {
            return await this.model.findAll({
                where: {
                    cnpj: cnpj
                }
            });
        } catch (error) {
            console.log("An error ocurred when searching for cnpj.");
            console.log(error);
            return null;
        }
    }

    async findByRazao(razao){
        try {
            return await this.model.findAll({
                where: {
                    razao: razao
                }
            });
        } catch (error) {
            console.log("An error ocurred when searching for razao.");
            console.log(error);
            return null;
        }
    }

    async findByEmail(email){
        try {
            return await this.model.findAll({
                where: {
                    email: email
                }
            });
        } catch (error) {
            console.log("An error ocurred when searching for email.");
            console.log(error);
            return null;
        }
    }

    async findAll(){
        return await this.model.findAll();
    }
}