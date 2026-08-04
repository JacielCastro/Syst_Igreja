const estado = {
    usuarios: [],
    chart: null
};

const elementos = {
    busca: document.getElementById('buscaDashboard'),
    tabela: document.getElementById('usuariosTableBody'),
    totalUsuarios: document.getElementById('totalUsuarios'),
    totalPastorais: document.getElementById('totalPastorais'),
    totalEventos: document.getElementById('totalEventos'),
    recarregar: document.getElementById('recarregar_btn'),
    novoEvento: document.getElementById('novoEvento_btn'),
    notificacoes: document.getElementById('notificacoes_btn'),
    equipes: document.getElementById('equipes_btn'),
    periodoGrafico: document.getElementById('periodoGrafico')
};

function iniciais(nome) {
    return nome
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase();
}

function escaparHtml(valor) {
    return String(valor ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function usuariosFiltrados() {
    const termo = elementos.busca.value.trim().toLowerCase();

    if (!termo) {
        return estado.usuarios;
    }

    return estado.usuarios.filter((usuario) => {
        return [usuario.nome, usuario.email, usuario.pastoral, usuario.telefone, usuario.nivelAcesso]
            .some((valor) => String(valor || '').toLowerCase().includes(termo));
    });
}

function atualizarMetricas() {
    const pastorais = new Set(
        estado.usuarios
            .map((usuario) => usuario.pastoral)
            .filter(Boolean)
    );

    elementos.totalUsuarios.textContent = estado.usuarios.length;
    elementos.totalPastorais.textContent = pastorais.size;
    elementos.totalEventos.textContent = '3';
}

function renderizarTabela() {
    const usuarios = usuariosFiltrados();

    if (!usuarios.length) {
        elementos.tabela.innerHTML = '<tr><td colspan="5">Nenhum usuario encontrado.</td></tr>';
        return;
    }

    elementos.tabela.innerHTML = usuarios.map((usuario) => `
        <tr>
            <td class="user-cell">
                <div class="mini-avatar">${escaparHtml(iniciais(usuario.nome))}</div>
                <div>
                    <strong>${escaparHtml(usuario.nome)}</strong>
                    <small>${escaparHtml(usuario.email)}</small>
                </div>
            </td>
            <td>${escaparHtml(usuario.pastoral || '-')}</td>
            <td>${escaparHtml(usuario.telefone || '-')}</td>
            <td><span class="status-pill active">${escaparHtml(usuario.nivelAcesso || 'Agente')}</span></td>
            <td class="actions-cell">
                <button class="table-action" type="button" data-action="editar" data-id="${usuario.id}">Editar</button>
                <button class="table-action danger" type="button" data-action="excluir" data-id="${usuario.id}">Excluir</button>
            </td>
        </tr>
    `).join('');
}

async function carregarUsuarios() {
    elementos.tabela.innerHTML = '<tr><td colspan="5">Carregando usuarios...</td></tr>';

    try {
        const resposta = await fetch('/adm/lista');
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || 'Nao foi possivel carregar os usuarios.');
        }

        estado.usuarios = dados;
        atualizarMetricas();
        renderizarTabela();
    } catch (error) {
        console.error(error);
        elementos.tabela.innerHTML = '<tr><td colspan="5">Erro ao carregar usuarios.</td></tr>';
    }
}

async function editarUsuario(id) {
    const usuario = estado.usuarios.find((item) => String(item.id) === String(id));

    if (!usuario) {
        return;
    }

    const nome = prompt('Nome do usuario:', usuario.nome);
    if (nome === null) return;

    const telefone = prompt('Telefone:', usuario.telefone || '');
    if (telefone === null) return;

    const pastoral = prompt('Pastoral:', usuario.pastoral || '');
    if (pastoral === null) return;

    const nivelAcesso = prompt('Nivel de acesso:', usuario.nivelAcesso || 'Agente');
    if (nivelAcesso === null) return;

    try {
        const resposta = await fetch(`/adm/usuario/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, telefone, pastoral, nivelAcesso })
        });
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || 'Nao foi possivel atualizar o usuario.');
        }

        alert(dados.mensagem);
        await carregarUsuarios();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

async function excluirUsuario(id) {
    const usuario = estado.usuarios.find((item) => String(item.id) === String(id));
    const confirmado = confirm(`Deseja excluir ${usuario?.nome || 'este usuario'}?`);

    if (!confirmado) {
        return;
    }

    try {
        const resposta = await fetch(`/adm/usuario/${id}`, { method: 'DELETE' });
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || 'Nao foi possivel excluir o usuario.');
        }

        alert(dados.mensagem);
        await carregarUsuarios();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function inicializarGrafico() {
    const canvas = document.getElementById('growthChart');

    if (!canvas || !window.Chart) {
        return;
    }

    const ctx = canvas.getContext('2d');
    const gradientPurple = ctx.createLinearGradient(0, 0, 0, 300);
    gradientPurple.addColorStop(0, 'rgba(142, 124, 195, 0.35)');
    gradientPurple.addColorStop(1, 'rgba(142, 124, 195, 0.0)');

    estado.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
            datasets: [{
                label: 'Participantes',
                data: [420, 580, 710, 890, 1050, 1240],
                borderColor: '#8e7cc3',
                borderWidth: 3,
                backgroundColor: gradientPurple,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#d4af37',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#888599', font: { family: 'Inter', size: 12 } } },
                y: { grid: { color: '#f0eff4' }, ticks: { color: '#888599', font: { family: 'Inter', size: 12 } } }
            }
        }
    });
}

function configurarEventos() {
    elementos.busca.addEventListener('input', renderizarTabela);
    elementos.recarregar.addEventListener('click', carregarUsuarios);
    elementos.novoEvento.addEventListener('click', () => alert('Modulo de eventos ainda nao possui cadastro no banco.'));
    elementos.notificacoes.addEventListener('click', () => alert('Nenhuma notificacao nova.'));
    elementos.equipes.addEventListener('click', () => alert('Use a tabela de agentes para editar pastorais e equipes.'));

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            elementos.busca.focus();
        }
    });

    document.querySelectorAll('.nav-item[href^="#"]').forEach((link) => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    elementos.tabela.addEventListener('click', (event) => {
        const botao = event.target.closest('button[data-action]');

        if (!botao) {
            return;
        }

        if (botao.dataset.action === 'editar') {
            editarUsuario(botao.dataset.id);
        }

        if (botao.dataset.action === 'excluir') {
            excluirUsuario(botao.dataset.id);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    inicializarGrafico();
    configurarEventos();
    await carregarUsuarios();
});
