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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
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