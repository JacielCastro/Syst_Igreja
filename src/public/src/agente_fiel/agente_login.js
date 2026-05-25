document.getElementById('loginForm').addEventListener('submit', async (event) =>{
    event.preventDefault();

    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('password').value;
    
    if(!email || !password){
        alert('Por favor! Preencha todos os compos!');
        return;
    }
    
});