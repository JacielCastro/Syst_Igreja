import 'dotenv/config'

import { sincronizarBD } from './src/database/database.js'
import app from './src/config/express_config.js'
import path from 'path'
import { cadastrarAdm } from './src/controllers/controllers_adm.js'

// O Render define automaticamente a variável PORT. O fallback é 3000 para local.
const PORT = process.env.PORT || process.env.EXPRESS_PORT || 3000

console.log("DATABASE:", process.env.DATABASE_URL ? "URL Configurada" : "URL Não Encontrada")

await sincronizarBD()
await cadastrarAdm()

app.get('/', (req, res) => {
    res.sendFile(
        path.resolve('./src/public/html/administrador/login.html')
    )
})

// Removido o parâmetro HOST fixo para permitir conexões externas no Render
app.listen(PORT, () => {
    console.log(`✅ Servidor em execução na porta: ${PORT}`)
})