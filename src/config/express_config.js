import express from 'express'
import path from 'path'
import morgan from 'morgan'
import routerAdm from '../routers/routers_adm.js'
import { fileURLToPath } from 'url'

// instânciando o express 
const app = express()
// obtendo o caminho do arquivo atual e do diretório
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middlewares padrões
// PERMITINDO QUE O SERVIDOR ENTENDA DADOS ENVIADOS EM JSON (fetch, axios, etc)
app.use(express.json()) 
// Permite que o servidor entenda dados enviados através de formulários HTML tradicionais
app.use(express.urlencoded({ extended: true }))
// imprime no seu terminal relatórios coloridos de cada requisição que chega (ex: POST /adm/login 200 12.345 ms)
app.use(morgan('dev'))
// Configurações de pastas e Views (EJS),
// Define a pasta /public como pública.
app.use(express.static(path.resolve('./public')))
// Define o EJS (Embedded JavaScript) como o motor de renderização de páginas (templates HTML dinâmicos).
app.set('view engine', 'ejs') 
// Informa ao Express em qual pasta estão salvos os arquivos .ejs 
app.set('views', path.join(__dirname, '../views')) 
//Diz ao servidor que todas as rotas configuradas dentro do routerAdm passarão a ter o prefixo /adm.
app.use('/adm', routerAdm)
// Exporta a configuração do aplicativo (app) para que outro arquivo possa importá-lo e ligar o servidor usando
export default app