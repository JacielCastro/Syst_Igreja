import express from 'express'
import path from 'path'

// Importamos todas as funções que acabamos de criar no arquivo do controlador
import { 
    cadastrarUsuario, 
    loginUsuario, 
    listarUsuarios, 
    atualizarUsuario, 
    deletarUsuario 
} from '../controllers/controllers_adm.js';

const router = express.Router();

// Rota de Cadastro: Quando houver um POST na URL /usuario, executa a função cadastrarUsuario
router.post('/usuario', cadastrarUsuario);

// Rota de Login: Quando houver um POST na URL /usuario/login, executa o loginUsuario
router.post('/usuario/login', loginUsuario);

// Rota de Listagem: Um método GET na URL /usuarios traz todos os cadastros
router.get('/usuarios', listarUsuarios);

// Rota de Atualização: O ':id' indica que a URL precisa de um número (ex: PUT /usuario/3)
router.put('/usuario/:id', atualizarUsuario);

// Rota de Deleção: Um método DELETE enviado para /usuario/:id remove o usuário correspondente
router.delete('/usuario/:id', deletarUsuario);

// ROTA DE TESTE 
router.get('/teste',(req, res) => {
    res.send('API funcionando !!')
});

router.get('/cadastro', (req, res) => {
    res.sendFile(path.resolve('./src/public/html/administrador/cadastro_usuario.html'))
});
// Exportamos o roteador completo para ser acoplado no arquivo de configuração do Express
export default router;