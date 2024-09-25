const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')

const listaSidebarBtn = [dashBtn, relatorioBtn, rncBtn, dashDetalhadoBtn, monitoramentoBtn]
const urlSidebar = [
    'homePage.html',
    'inexistente.html',
    'abrirRnc.html',
    'dashDetalhe.html',
    'monitoramento.html'
]

for(let i = 0; i < listaSidebarBtn.length; i++) {
    listaSidebarBtn[i].addEventListener('click', () => {
        window.location.href = urlSidebar[i]
    })
}

function atualizaSeveridade(select) {
    const tr = select.closest('tr');
    const severidade = select.value;

    tr.classList.remove('severidadeUrgente', 'severidadeAlta', 'severidadeMedia', 'severidadeBaixa');

    if (severidade === 'urgente') {
        tr.classList.add('severidadeUrgente');
    } else if (severidade === 'alta') {
        tr.classList.add('severidadeAlta');
    } else if (severidade === 'media') {
        tr.classList.add('severidadeMedia');
    } else if (severidade === 'baixa') {
        tr.classList.add('severidadeBaixa');
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

function atualizarTabela() {
    const tabela = document.getElementById('tabelaRNC');
    const rows = Array.from(tabela.rows).slice(1);
    
    // Ordenar por severidade e status
    rows.sort((a, b) => {
        const severidadeA = getSeveridadeValue(a);
        const severidadeB = getSeveridadeValue(b);

        if (severidadeA === severidadeB) {
            return getStatusValue(a) - getStatusValue(b);
        }
        return severidadeA - severidadeB;
    });

    rows.forEach(row => tabela.appendChild(row));
}

function getSeveridadeValue(row) {
    const severidade = row.querySelector('.severidadeSelect').value;
    if (severidade === 'urgente') return 1;
    if (severidade === 'alta') return 2;
    if (severidade === 'media') return 3;
    if (severidade === 'baixa') return 4;
    return 5;
}

function getStatusValue(row) {
    const status = row.querySelector('.statusSelect').value;
    if (status === 'concluido') return 1;
    return 2; // Outros estados têm a mesma prioridade
}

function verDetalhes(rncId) {
    // Abrir modal com os detalhes
    alert(`Detalhes da RNC ${rncId}`);
}


