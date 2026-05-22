// ESPORTANDO O SEQUELIZE PARA CONECTAR AO BANCO DE DADOS
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./src/database/dados.sqlite'
})