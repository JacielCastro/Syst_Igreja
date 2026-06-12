import { DataTypes } from "sequelize";
import sequelize from '../database/database.js'; // Puxa a configuração que criamos acima


const administrador = sequelize.define('administrador', {
    // O Sequelize cria o 'id' automaticamente
    nome: {
        type: DataTypes.STRING,
        allowNull: false // Não permite campo vazio
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Não deixa cadastrar o mesmo e-mail duas vezes
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pastoral: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nivelAcesso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default administrador;