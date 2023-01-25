import { DataTypes, Sequelize, Op } from "sequelize";
import Usuario from "../models";

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
        this.usuario = new Usuario();
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

    async save(usuario){
        console.log(usuario);
        try {
            this.usuario = usuario;
            return await this.model.create(this.usuario);
        } catch (error) {
            console.log("An error ocurred when trying to save the user.");
            console.log(error);
            return null;
        }
    }

    async getInstance(usuario){
        try {
            
            const returnedUser =  await this.model.findOne({where: {
                nome: usuario.nome,
                cpf: usuario.cpf,
                rg: usuario.rg
            }});
            return returnedUser;
        } catch (error) {
            console.log("An error ocurred getting the user");
            console.log(error);
            return null;
        }
    }

    async update(usuario){
        try {
            const affectedRows = await this.model.update(
                {
                    pai: usuario.pai,
                    mae: usuario.mae
                },
                {
                    where: {
                        nome: usuario.nome,
                        cpf: usuario.cpf,
                        rg: usuario.rg
                    }
                }
            );
            console.log("Affected Rows:");
            console.log(affectedRows);
            return affectedRows;
        } catch (error) {
            console.log("An error ocurred updating the user.");
            console.log(error);
            return null;
        }
    }

    async delete(usuario){
        try {
            return await this.model.destroy({
                where: {
                    nome: usuario.nome,
                    cpf: usuario.cpf,
                    rg: usuario.rg
                }
            });
        } catch (error) {
            console.log("An error ocurred trying to delete the user.");
            console.log(error);
        }
    }

    async findById(id){
        try {
            let foundClient =  await this.model.findByPk(id);
            console.log(foundClient);
            return foundClient;
        } catch (error) {
            console.log("An error ocurred finding the user by id");
            console.log(error);
            return null;
        }
    }

    async findByGender(gender){
        try {
            return await this.model.findAll({
                where: {
                    sexo: gender
                }
            });
        } catch (error) {
            console.log("An error ocurred when sarching for gender.");
            console.log(error);
            return null;
        }
    }

    async findByBirthday(initDate, finalDate){
        try {
            console.log(initDate);
            console.log(finalDate);
            let foundClients = await this.model.findAll({
                where: {
                    datadenascimento: {
                        [Op.between]: [initDate, finalDate]
                    }
                }
            });
            return foundClients;
        } catch (error) {
            console.log("An error ocurred search by birthday");
            console.log(error);
            return null;
        }
    }

    async totalByGender(){
        let answer = {
            rows: 0,
            genders: {}
        };

        try {
            let allRows = await this.getTotalRows();
            answer.rows = allRows;
        } catch (error) {
            console.log("Error getting the total rows.");    
            console.log(error);
            return answer;
        }

        try {
            let genderTotal = await this.model.findAll(
                {
                    "attributes": [
                        "sexo",
                        [
                            this.sequelize.fn("sum", this.sequelize.col("salario")), "salario"
                        ]
                    ],
                    "group": ["sexo"],
                    order: this.sequelize.literal("sexo DESC")
                }
            );
            answer.genders = genderTotal;
        } catch (error) {
            console.log("Error getting the sum.");    
            console.log(error);
        }


        
        return answer;
    }

    async totalByCity(){

        let answer = {
            rows: 0,
            cities: {}
        };

        try {
            let allRows = await this.getTotalRows();
            answer.rows = allRows;
        } catch (error) {
            console.log("Error getting the total rows.");    
            console.log(error);
            return answer;
        }

        try {

            let citiesTotal = await this.model.findAll({
                "attributes": [
                    "cidade",
                    [
                        this.sequelize.fn("sum", this.sequelize.col("salario")), "salario"
                    ]
                ],
                group: ["cidade"],
                order: this.sequelize.literal("cidade DESC")
            });

            console.log(citiesTotal);
    
            answer.cities = citiesTotal;

        } catch (error) {
            console.log("Error getting the total rows.");    
            console.log(error);
        }


        return answer;

    }

    async totalBySpecies(){
        
        let answer = {
            rows: 0,
            species: {}
        };

        try {
            let allRows = await this.getTotalRows();
            answer.rows = allRows;
        } catch (error) {
            console.log("Error getting the total rows.");    
            console.log(error);
            return answer;
        }

        try {

            let speciesTotal = await this.model.findAll({
                "attributes": [
                    "especie",
                    [
                        this.sequelize.fn("sum", this.sequelize.col("salario")), "salario"
                    ]
                ],
                group: ["especie"],
                order: this.sequelize.literal("especie DESC")
            });

            console.log(speciesTotal);
    
            answer.species = speciesTotal;
        } catch (error) {
            console.log("Error getting the total rows.");    
            console.log(error);
        }
                
        return answer;
    }

    async getTotalRows(){
        let allRows = await this.model.findAll();
        let records = allRows.length;
        return records;
    }

    async getAllRows(){
        return await this.model.findAll();
    }

}