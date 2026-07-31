import 'dotenv/config'

import { sincronizarBD } from './src/database/database.js'
import app from './src/config/express_config.js'
import path from 'path'
import { cadastrarAdm } from './src/controllers/controllers_adm.js'

let PORT = process.env.EXPRESS_PORT
let HOST = process.env.EXPRESS_HOST

if (process.env.MODE_NODE === 'dev') {

    PORT = 3000
    HOST = 'localhost'

}

console.log("DATABASE:", process.env.DATABASE_URL)

await sincronizarBD()
cadastrarAdm()

app.get('/', (req,res)=>{

    res.sendFile(
        path.resolve('./src/public/html/administrador/login.html')
    )

})

app.listen(PORT, HOST, ()=>{

    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)

})