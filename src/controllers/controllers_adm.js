// Importamos o Modelo do Administrador para conseguir interagir com a tabela do banco SQLite
import administrador from '../model/model_adm.js';

// --- 1. FUNÇÃO DE CADASTRO (CREATE) ---
export const cadastrarAdm = async () => {
    try {
        const email = 'jaciel100@gmail.com';
        
        // Verifica se já existe antes de tentar criar
        const existe = await administrador.findOne({ where: { email } });
        
        if (!existe) {
            await administrador.create({
                nome: 'jaciel', 
                email: email, 
                telefone: '84987827266', 
                genero: 'masculino', 
                pastoral: 'pastoral pascom',     
                nivelAcesso: 'coordenador', 
                senha: '123456'
            });
            console.log('✅ Administrador padrão criado com sucesso no banco!');
        } else {
            console.log('ℹ️ Administrador padrão já existe no banco.');
        }
    } catch (error) {
        console.error('❌ Erro ao verificar/cadastrar adm inicial:', error);
    }
};

// --- 2. FUNÇÃO DE LOGIN (AUTENTICAÇÃO) ---
export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await administrador.findOne({ where: { email } });

        if (!usuario || usuario.senha !== password) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos!' });
        }

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            usuario: {
                nome: usuario.nome,
                nivel: usuario.nivelAcesso
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro interno ao realizar o login.' });
    }
};

// --- 3. FUNÇÃO DE LISTAR USUÁRIOS (READ) ---
export const listarUsuarios = async (req, res) => {
    try {
        // O método .findAll() busca TODOS os registros cadastrados na tabela do banco
        const usuarios = await administrador.findAll({
            // Segurança: pedimos para o banco não trazer a coluna 'senha' na listagem
            attributes: { exclude: ['senha'] }
        });

        // Retorna a lista de usuarios encontrada para o frontend
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao listar os administradores.' });
    }
};

// --- 4. FUNÇÃO DE ATUALIZAR USUÁRIO (UPDATE) ---
export const atualizarUsuario = async (req, res) => {
    try {
        // Pegamos o ID do usuario diretamente da URL (ex: /usuario/5)
        const { id } = req.params;
        const { nome, telefone, pastoral, nivelAcesso } = req.body;

        // Procuramos se o usuario com aquele ID realmente existe no banco
        const usuario = await administrador.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuario não encontrado.' });
        }

        // Usamos o método .update() para atualizar as informações no SQLite
        await administrador.update(
            { nome, telefone, pastoral, nivelAcesso },
            { where: { id } } // Garante que só vai atualizar o usuario com o ID específico
        );

        return res.status(200).json({ mensagem: 'Dados do usuario atualizados com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao atualizar os dados.' });
    }
};

// --- 5. FUNÇÃO DE DELETAR USUÁRIO (DELETE) ---
export const deletarUsuario = async (req, res) => {
    try {
        // Captura o ID vindo da URL
        const { id } = req.params;

        // O método .destroy() apaga o registro permanentemente do SQLite
        const deletado = await administrador.destroy({ where: { id } });

        // Se o resultado for 0, significa que nenhum registro tinha aquele ID para ser deletado
        if (deletado === 0) {
            return res.status(404).json({ erro: 'Usuario não encontrado para exclusão.' });
        }

        return res.status(200).json({ mensagem: 'Usuario removido do sistema com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao deletar o usuario.' });
    }
};
// --- FUNÇÃO DE CADASTRO DE ADMINISTRADOR FIXO (APENAS PARA TESTE) ---
export const cadastrarAdm = async (req, res) => {
    try {
        
        const novoAdministrador = await administrador.create({
            nome: 'jaciel', 
            email:'jaciel100@gmail.com', 
            telefone:'84987827266', 
            genero: 'masculino', 
            pastoral: 'pastoral pascom',     
            nivelAcesso:'coordenador', 
            senha:'123456'
        });

        console.log('Administrador criado com sucesso!');
        
        
    } catch (error) {
        // Exibe o erro detalhado no terminal caso aconteça alguma falha catastrófica
        console.error(error);
       
    }
};