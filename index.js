import 'dotenv/config'
import { sincronizarBD } from './src/database/database.js'
import app from './src/config/express_config.js'
import path from 'path'
import { cadastrarAdm } from './src/controllers/controllers_adm.js'

// O Render injeta a variável PORT automaticamente. 3000 é o fallback para local.
const PORT = process.env.PORT || process.env.EXPRESS_PORT || 3000

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "URL Configurada" : "URL Não Encontrada")

// Sincroniza o banco de dados e cria o ADM padrão se não existir
await sincronizarBD()
await cadastrarAdm()

app.get('/', (req, res) => {
    res.sendFile(
        path.resolve('./src/public/html/administrador/login.html')
    )
})

// Inicializa o servidor escutando a porta do ambiente
app.listen(PORT, () => {
    console.log(`✅ Servidor em execução na porta: ${PORT}`)
})
