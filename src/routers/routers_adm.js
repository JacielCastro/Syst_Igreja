import express from 'express'

// Importamos todas as funções que acabamos de criar no arquivo do controlador
import { 
    cadastrarAgente, 
    loginAgente, 
    listarAgentes, 
    atualizarAgente, 
    deletarAgente 
} from '../controllers/controllers_adm.js';

const router = express.Router();

// Rota de Cadastro: Quando houver um POST na URL /agente, executa a função cadastrarAgente
router.post('/agente', cadastrarAgente);

// Rota de Login: Quando houver um POST na URL /agente/login, executa o loginAgente
router.post('/agente/login', loginAgente);

// Rota de Listagem: Um método GET na URL /agentes traz todos os cadastros
router.get('/agentes', listarAgentes);

// Rota de Atualização: O ':id' indica que a URL precisa de um número (ex: PUT /agente/3)
router.put('/agente/:id', atualizarAgente);

// Rota de Deleção: Um método DELETE enviado para /agente/:id remove o usuário correspondente
router.delete('/agente/:id', deletarAgente);

// ROTA DE TESTE 
router.get('/teste',(req, res) => {
    res.send('API funcionando !!')
});

router.post('/cadastro',cadastrarAgente)
// Exportamos o roteador completo para ser acoplado no arquivo de configuração do Express
export default router;