import { Sequelize } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//INSTANCIANDO O SEQUELIZE COM A CONFIGURAÇÃO DO BANCO DE DADOS
let sequelize

// Usando a variável padrão NODE_ENV ou mantendo fallback para desenvolvimento
const isDev = process.env.MODE_NODE === 'dev' || process.env.NODE_ENV === 'development'
// Se estiver em desenvolvimento, use SQLite; caso contrário, use Postgres (Neon)
if (isDev) {
  console.log('⚡ Conectando ao banco local (SQLite)...')
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', './database/database.sqlite'),
    logging: false
  })
} else {
  console.log('🌐 Conectando ao banco de produção (Neon / Postgres)...')
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERRO CRÍTICO: A variável DATABASE_URL não foi informada no ambiente!')
  }
  // Configuração para o Neon (Postgres) com SSL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  })
}
// Função para sincronizar o banco de dados com os modelos definidos
export async function sincronizarBD() {
  try {
    await sequelize.authenticate()
    console.log('✅ Banco conectado com sucesso!')
    // Cria ou ajusta as tabelas no banco com base nos Models.
    await sequelize.sync()
    console.log('✅ Tabelas sincronizadas com sucesso!')
  } catch (error) {
    console.error('❌ Erro de conexão/sincronização no banco:', error)
  }
}

export default sequelize
