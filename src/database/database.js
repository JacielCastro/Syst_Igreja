import { Sequelize } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let sequelize

if (process.env.DATA_NODE === 'dev') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'database.sqlite'),
        logging: false
})
} else {
    sequelize = new Sequelize(
    process.env.DATABASE_URL,

    {
    dialect : 'postgres',
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
    }
)
}

// Corrige o __dirname no ESModule


// Configuração do banco SQLite
/*const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: false
})
*/
// const sequelize = new Sequelize(
//     process.env.DATABASE_URL,

//     {
//     dialect : 'postgres',
//     dialectOptions: {
//         ssl:{
//             require: true,
//             rejectUnauthorized: false
//         }
//     },
//     logging: false
//     }

// )
// Função para sincronizar o banco
export async function sincronizarBD() {
    try {
        await sequelize.authenticate()
        console.log('Banco conectado com sucesso!')

        await sequelize.sync()
        console.log('Banco sincronizado!')
    } catch (error) {
        console.error('Erro ao conectar no banco:', error)
    }
}

// Exportação padrão

// console.log(sequelize);


export default sequelize