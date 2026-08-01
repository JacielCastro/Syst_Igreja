document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('password').value;
    
    if(!email || !password){
        alert('Por favor! Preencha todos os campos!');
        return;
    }
    try {
        // CORRIGIDO: Adicionado /adm antes de /login
        const response = await fetch('/adm/login', {
            // forma de envio para o backend
            method: 'POST',
            //enviando em JSON PARA O backend            
            headers: {
                'Content-Type': 'application/json'
            },
            // tansformando o objeto javascript em uma string no formato JSON
            body: JSON.stringify({ email, password })
        });
        // Aguardando a resposta do servidor e convertendo para JSON para um objeto javascript
        const data = await response.json();
        // verificando se a resposta do servidor foi bem-sucedida (status 200)
        if (response.ok) {
            // enviando uma mensagem de sucessopara o usuário
            alert(data.mensagem);
            // Redireciona usando a pasta configurada no express.static
            window.location.href = "/html/administrador/dashboard.html";
        } else {
            alert(data.erro);
        }
    } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
        alert('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
    }
});