import express from 'express'
import path from 'path'
import morgan from 'morgan'
import routerAdm from '../routers/routers_adm.js'
import { fileURLToPath } from 'url'


const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middlewares padrões
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Configurações de pastas e Views (EJS)
app.use(express.static(path.join(__dirname, '../public'))) 
app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, '../views')) 

// Ativação das Rotas do Projeto
app.use(routerAdm)

// testando as rotas 
app.use('/adm', routerAdm)

export default app