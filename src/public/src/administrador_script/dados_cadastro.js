
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
const novoUsuario = {
    nome,
    telefone,
    email,
    genero,
    pastoral,
    nivelAcesso,
    senha
};

try {

    const resposta = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    });

    const dados = await resposta.json();

    if (resposta.ok) {
        alert('Cadastro realizado com sucesso!');
        console.log(dados);
    } else {
        alert(dados.mensagem);
    }

} catch (error) {

    console.error(error);
    alert('Erro ao conectar com o servidor.');

}
});