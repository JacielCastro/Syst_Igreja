import { Sequelize } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let sequelize

// Usando a variável padrão NODE_ENV ou mantendo fallback para desenvolvimento
const isDev = process.env.NODE_ENV === 'development' || process.env.DATA_NODE === 'dev'

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

export async function sincronizarBD() {
  try {
    await sequelize.authenticate()
    console.log('✅ Banco conectado com sucesso!')

    // Nota: Em produção, cuidado com { force: true } ou { alter: true } se usar futuramente
    await sequelize.sync()
    console.log('✅ Tabelas sincronizadas com sucesso!')
  } catch (error) {
    console.error('❌ Erro de conexão/sincronização no banco:', error)
  }
}

export default sequelize