import dotenv from 'dotenv'
import { sincronizarBD } from './src/database/database.js' 
import app from './src/config/express_config.js'   
import path from 'path'        

// 1. Carrega as variáveis de ambiente primeiro de tudo
dotenv.config()

const PORT = process.env.EXPRESS_PORT || 3000
const HOST = process.env.EXPRESS_HOST || 'localhost'

// 2. Sincroniza o Banco de Dados SQLite
await sincronizarBD()

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/administrador/login.html'))
})

// 3. Inicialização e escuta do Servidor
app.listen(PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})