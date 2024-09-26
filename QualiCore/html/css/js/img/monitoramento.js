const dashBtn = document.querySelector('#dashBtn');
const relatorioBtn = document.querySelector('#relatorioBtn');
const rncBtn = document.querySelector('#rncBtn');
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn');
const monitoramentoBtn = document.querySelector('#monitoramentoBtn');


const listaSidebarBtn = [dashBtn, relatorioBtn, rncBtn, dashDetalhadoBtn, monitoramentoBtn];
const urlSidebar = [
    'homePage.html',
    'inexistente.html',
    'abrirRnc.html',
    'dashDetalhe.html',
    'monitoramento.html'
];

for (let i = 0; i < listaSidebarBtn.length; i++) {
    listaSidebarBtn[i].addEventListener('click', () => {
        window.location.href = urlSidebar[i];
    });
}

function atualizaSeveridade(select) {
    const tr = select.closest('tr');
    const severidade = select.value;
    const bolinha = tr.querySelector('.bolinha');

    // Remover classes de severidade
    tr.classList.remove('severidadeUrgente', 'severidadeAlta', 'severidadeMedia', 'severidadeBaixa');

    // Atualizar a severidade e bolinha
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

function getSeveridadeValue(row) {
    const severidade = row.querySelector('.severidadeSelect').value;
    if (severidade === 'urgente') return 1;
    if (severidade === 'alta') return 2;
    if (severidade === 'media') return 3;
    if (severidade === 'baixa') return 4;
    return 5; // Se não houver severidade
}

function getStatusValue(row) {
    const status = row.querySelector('.statusSelect').value;
    if (status === 'concluido') return 1;
    return 2; // Outros estados têm a mesma prioridade
}



const modal = document.getElementById("rncDetailsModal");
const closeBtn = document.getElementsByClassName("close")[0];
const saveBtn = document.getElementById("saveBtn");
const closeBtnFooter = document.getElementById("closeBtn");
const metodoOutro = document.getElementById("metodoOutro");
const metodoOutroTexto = document.getElementById("metodoOutroTexto");

function openModal(button) {

    const rncData = {
        numero: "001",
        dataHora: '01/08/2024 - 14:00',
        setorAutuante: 'Tecnologia da Informação',
        origem: 'Reclamação',
        severidade: 'Alta',
        status: 'Em Andamento'
    };

    const numeroRnc = rncData.numero
    const dataHoraRnc = rncData.dataHora
    const setorAutuanteRnc = rncData.setorAutuante
    const origiemRnc = rncData.origem
    const severidadeRnc = rncData.severidade
    const statusRnc = rncData.status


    document.getElementById("rncNumber").textContent = numeroRnc;
    document.getElementById("rncDataHora").value = dataHoraRnc;
    document.getElementById("rncSetorAutuante").value = setorAutuanteRnc;
    document.getElementById("rncOrigem").value = origiemRnc;
    // document.getElementById("rncSeveridade").value = severidadeRnc;
    // document.getElementById("rncStatus").value = statusRnc;

    modal.style.display = "block";
}

const detalheRnc = document.querySelector('#detalheRnc')
detalheRnc.addEventListener('click', () => {
    openModal()
})

function closeModal() {
    modal.style.display = "none";
}

closeBtn.onclick = closeModal;


saveBtn.onclick = function() {
    console.log("Salvando dados...");
    closeModal();
}

metodoOutro.onchange = function() {
    metodoOutroTexto.style.display = this.checked ? "inline-block" : "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
