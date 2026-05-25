import { Sequelize } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'

// Corrige o __dirname no ESModule
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuração do banco SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: false
})

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
export default sequelize