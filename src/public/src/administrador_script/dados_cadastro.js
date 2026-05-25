
document.getElementById('cadastroForm').addEventListener('submit', async (event) =>{
    event.preventDefault();

    const nome = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('password').value;
    const confirSenha = document.getElementById('password_confirm').value;
    const genero = document.getElementById('genero').value;
    const pastoral = document.getElementById('pastoral').value;
    const nivelAcesso = document.getElementById('nivel_acesso').value;

if (!nome || !email || !telefone || !senha || !confirSenha || !genero || !pastoral || !nivelAcesso ){
    alert('Por Favor ! preencha todos os campos obrigatórios.')
    return;
}
if(senha !== confirSenha ){
    alert(' Senhas não conferem, por favor verifique e tente novamente.')
    return;
}

alert('Cadastro realizado com sucesso!');

const novoUsuario = {
    nome: nome,
    telefone: telefone,
    email: email,
    genero: genero,
    pastoral: pastoral,
    nivelAcesso: nivelAcesso,
    senha: senha
}

// Transforma o objeto em um texto organizado e legível
const textoDoObjeto = JSON.stringify(novoUsuario, null, 2);

console.log("Dados do Agente:", novoUsuario);
})