import administrador from '../model/model_adm.js';

export const cadastrarAdmPadrao = async () => {
    try {
        const email = 'jaciel100@gmail.com';
        const existe = await administrador.findOne({ where: { email } });

        if (!existe) {
            await administrador.create({
                nome: 'jaciel',
                email,
                telefone: '84987827266',
                genero: 'masculino',
                pastoral: 'Pascom',
                nivelAcesso: 'Coordenador',
                senha: '123456'
            });
            console.log('Administrador padrao criado com sucesso no banco!');
        } else {
            console.log('Administrador padrao ja existe no banco.');
        }
    } catch (error) {
        console.error('Erro ao verificar/cadastrar adm inicial:', error);
    }
};

export const cadastrarAdm = async (req, res) => {
    try {
        const { nome, email, telefone, genero, pastoral, nivelAcesso, senha } = req.body;

        if (!nome || !email || !telefone || !genero || !pastoral || !nivelAcesso || !senha) {
            return res.status(400).json({ erro: 'Preencha todos os campos obrigatorios.' });
        }

        const existe = await administrador.findOne({ where: { email } });

        if (existe) {
            return res.status(409).json({ erro: 'Ja existe um usuario cadastrado com este e-mail.' });
        }

        const novoAdministrador = await administrador.create({
            nome,
            email,
            telefone,
            genero,
            pastoral,
            nivelAcesso,
            senha
        });

        const usuario = novoAdministrador.toJSON();
        delete usuario.senha;

        return res.status(201).json({
            mensagem: 'Usuario cadastrado com sucesso!',
            usuario
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao cadastrar o usuario.' });
    }
};

export const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Informe e-mail e senha.' });
        }

        const usuario = await administrador.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ erro: 'Usuario nao encontrado.' });
        }

        if (usuario.senha !== senha) {
            return res.status(401).json({ erro: 'Senha incorreta.' });
        }

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                pastoral: usuario.pastoral,
                nivelAcesso: usuario.nivelAcesso
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao fazer login.' });
    }
};

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await administrador.findAll({
            attributes: { exclude: ['senha'] },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao listar os administradores.' });
    }
};

export const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, genero, pastoral, nivelAcesso, senha } = req.body;

        const usuario = await administrador.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuario nao encontrado.' });
        }

        const emailEmUso = email
            ? await administrador.findOne({ where: { email } })
            : null;

        if (emailEmUso && String(emailEmUso.id) !== String(id)) {
            return res.status(409).json({ erro: 'Este e-mail ja esta sendo usado por outro usuario.' });
        }

        const dadosAtualizados = { nome, email, telefone, genero, pastoral, nivelAcesso };

        if (senha) {
            dadosAtualizados.senha = senha;
        }

        Object.keys(dadosAtualizados).forEach((campo) => {
            if (dadosAtualizados[campo] === undefined || dadosAtualizados[campo] === '') {
                delete dadosAtualizados[campo];
            }
        });

        await administrador.update(dadosAtualizados, { where: { id } });

        return res.status(200).json({ mensagem: 'Dados do usuario atualizados com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao atualizar os dados.' });
    }
};

export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await administrador.destroy({ where: { id } });

        if (deletado === 0) {
            return res.status(404).json({ erro: 'Usuario nao encontrado para exclusao.' });
        }

        return res.status(200).json({ mensagem: 'Usuario removido do sistema com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao deletar o usuario.' });
    }
};
