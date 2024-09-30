

// Modal
const modal = document.getElementById("rncDetailsModal");
const closeBtn = document.getElementsByClassName("close")[0];
const saveBtn = document.getElementById("saveBtn");
// const metodoOutro = document.getElementById("metodoOutro");
const metodoOutroTexto = document.getElementById("metodoOutroTexto");


function openModal() {
    const rncData = {
        numero: "001",
        dataHora: '01/08/2024 - 14:00',
        setorAutuante: 'Tecnologia da Informação',
        origem: 'Reclamação',
        severidade: 'Alta',
        status: 'Em Andamento',
        enquadramento: 'ABNT NBR ISO 9001:2015'
    };

    document.getElementById("rncNumber").textContent = rncData.numero;
    document.querySelector('#data-hora').value = rncData.dataHora;
    document.querySelector('#origem').value = rncData.origem;
    document.querySelector('#setor-autuante').value = rncData.setorAutuante
    document.querySelector('#enquadramento').value = rncData.enquadramento
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

// Event Listeners
document.querySelector('#detalheRnc').addEventListener('click', openModal);
closeBtn.onclick = closeModal;

saveBtn.onclick = function() {
    console.log("Salvando dados...");
    closeModal();
};

// metodoOutro.onchange = function() {
//     metodoOutroTexto.style.display = this.checked ? "inline-block" : "none";
// };

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Sidebar Navigation
const sidebarButtons = {
    dashBtn: 'homePage.html',
    relatorioBtn: 'inexistente.html',
    rncBtn: 'abrirRnc.html',
    dashDetalhadoBtn: 'dashDetalhe.html',
    monitoramentoBtn: 'monitoramento.html',
    departamentoBtn: 'departamentos.html',
    usuariosBtn: 'usuarios.html'
};

Object.keys(sidebarButtons).forEach(buttonId => {
    const button = document.querySelector(`#${buttonId}`);
    button.addEventListener('click', () => {
        window.location.href = sidebarButtons[buttonId];
    });
});

// Atualizar Severidade e Status
function atualizaSeveridade(select) {
    const tr = select.closest('tr');
    const severidade = select.value;
    const bolinha = tr.querySelector('.bolinha');

    // Remover classes de severidade
    tr.classList.remove('severidadeUrgente', 'severidadeAlta', 'severidadeMedia', 'severidadeBaixa');

    // Atualizar severidade e bolinha
    if (severidade === 'urgente') {
        tr.classList.add('severidadeUrgente');
        bolinha.className = 'bolinha severidadeUrgente';
    } else if (severidade === 'alta') {
        tr.classList.add('severidadeAlta');
        bolinha.className = 'bolinha severidadeAlta';
    } else if (severidade === 'media') {
        tr.classList.add('severidadeMedia');
        bolinha.className = 'bolinha severidadeMedia';
    } else if (severidade === 'baixa') {
        tr.classList.add('severidadeBaixa');
        bolinha.className = 'bolinha severidadeBaixa';
    }

    atualizarTabela();
}

function atualizaStatus(select) {
    const tr = select.closest('tr');
    const status = select.value;

    if (status === 'concluido') {
        tr.classList.add('statusConcluido');
    } else {
        tr.classList.remove('statusConcluido');
    }

    atualizarTabela();
}

// Helper Functions for Severidade e Status
function getSeveridadeValue(row) {
    const severidade = row.querySelector('.severidadeSelect').value;
    const severidadeMap = {
        'urgente': 1,
        'alta': 2,
        'media': 3,
        'baixa': 4
    };
    return severidadeMap[severidade] || 5; // Se não houver severidade
}

function getStatusValue(row) {
    const status = row.querySelector('.statusSelect').value;
    return status === 'concluido' ? 1 : 2; // Outros estados têm a mesma prioridade
}

// Essa parte é para a troca de abas dentro do modal ver detalhes no monitoramento

const detalhamentoRncBtn = document.querySelector('#detalhamentoBtn');
const andamentoBtn = document.querySelector('#andamentoBtn');
const conclusaoBtn = document.querySelector('#conclusaoBtn');

const abaDetalhamento = document.querySelector('#detalhamento');
const abaAndamento = document.querySelector('#andamento');
const abaConclusao = document.querySelector('#conclusao');

const listaDetalhesBtn = [detalhamentoRncBtn, andamentoBtn, conclusaoBtn];
const abas = [abaDetalhamento, abaAndamento, abaConclusao];

// Função para ocultar todas as abas e remover 'active' de todos os botões
function resetAbas() {
    abas.forEach(aba => aba.style.display = 'none'); // Esconder todas as abas
    listaDetalhesBtn.forEach(btn => btn.classList.remove('active')); // Remover 'active' de todos os botões
}

// Mostrar a aba Detalhamento inicialmente
function inicializarAba() {
    resetAbas(); // Esconder todas as abas inicialmente
    abaDetalhamento.style.display = 'flex'; // Mostrar a aba de Detalhamento
    detalhamentoRncBtn.classList.add('active'); // Marcar o botão de Detalhamento como ativo
}

// Adiciona eventos de clique para trocar as abas
for (let z = 0; z < listaDetalhesBtn.length; z++) {
    listaDetalhesBtn[z].addEventListener('click', (e) => {
        e.preventDefault();
        
        resetAbas(); // Ocultar todas as abas e remover 'active' de todos os botões
        
        abas[z].style.display = 'flex'; // Mostrar aba correspondente ao botão clicado
        listaDetalhesBtn[z].classList.add('active'); // Adicionar 'active' ao botão clicado
    });
}

// Inicializa a primeira aba ao carregar a página
inicializarAba();

