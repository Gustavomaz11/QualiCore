const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
// Modal
const modal = document.getElementById("gerenciamentoDepartamento");
const closeBtn = document.querySelector(".close");
const saveBtn = document.getElementById("saveBtn");
const navPrincipalBtn = document.querySelector('.navPrincipal button')

const listaSidebarBtn = [dashBtn, relatorioBtn, rncBtn, dashDetalhadoBtn, monitoramentoBtn, departamentoBtn, usuariosBtn]
const urlSidebar = [
    'homePage.html',
    'inexistente.html',
    'abrirRnc.html',
    'dashDetalhe.html',
    'monitoramento.html',
    'departamentos.html',
    'usuarios.html'
]

for(let i = 0; i < listaSidebarBtn.length; i++) {
    listaSidebarBtn[i].addEventListener('click', () => {
        window.location.href = urlSidebar[i]
    })
}

function openModal() {
    // const rncData = {
    //     numero: "001",
    //     dataHora: '01/08/2024 - 14:00',
    //     setorAutuante: 'Tecnologia da Informação',
    //     origem: 'Reclamação',
    //     severidade: 'Alta',
    //     status: 'Em Andamento',
    //     enquadramento: 'ABNT NBR ISO 9001:2015'
    // };

    // document.getElementById("rncNumber").textContent = rncData.numero;
    // document.querySelector('#data-hora').value = rncData.dataHora;
    // document.querySelector('#origem').value = rncData.origem;
    // document.querySelector('#setor-autuante').value = rncData.setorAutuante
    // document.querySelector('#enquadramento').value = rncData.enquadramento
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

navPrincipalBtn.addEventListener('click', openModal)


