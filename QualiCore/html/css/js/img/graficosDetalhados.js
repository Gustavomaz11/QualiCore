const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
const cxEntradaBtn = document.querySelector('#cxEntradaBtn')
const meuPerfilBtn = document.querySelector('#meuPerfilBtn')

// pegando a rnc pelo localstorege
let rnc = localStorage.getItem('rnc')
if (rnc!= null)
    rnc = JSON.parse(rnc)
let lengthRnc = localStorage.getItem('lengthRnc')
if(lengthRnc != null)
    lengthRnc = JSON.parse(lengthRnc)

// pegando usuario
let user = localStorage.getItem('login')
if(user != null)
    user = JSON.parse(user)

if(user == null)
    window.location.href = 'index.html';

const nome = document.querySelector('#nome')
nome.innerText = user.nome?user.nome:'xxxx'

// pegando funcionarios
let funcionarios = localStorage.getItem('funcionarios')
if(funcionarios != null)
    funcionarios = JSON.parse(funcionarios)

// limpando o cash
const btnlimparCash = document.querySelector('#limparCash')
btnlimparCash.addEventListener('click',()=>{
    localStorage.removeItem('rnc')
    localStorage.removeItem('lengthRnc')
    console.log(funcionarios)
    funcionarios.map((funcionario)=>{
        funcionario.mensagens = []
    })
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    localStorage.removeItem('login')
    window.location.href = 'index.html';
})



// função que deixa a cor da carta laranja caso tenha alguam msg não vista
function atualizandoUser (user, funcionarios){
    user = localStorage.getItem('login')
    if(user != null)
        user = JSON.parse(user)

    console.log(user)

    funcionarios = localStorage.getItem('funcionarios')
    if(funcionarios != null)
        funcionarios = JSON.parse(funcionarios)

    funcionarios?.map((funcionario)=>{
        if(funcionario.email == user.email){
            funcionario.mensagens.map((menssagem)=>{
                console.log(menssagem)
                if(menssagem.lida == false){
                    if(cxEntradaBtn.className == 'botaoIcone novaMenssagem') return
                    else
                        cxEntradaBtn.classList.add('novaMenssagem')
                }
                else{
                    cxEntradaBtn.classList.remove('novaMenssagem')
                }
            })
        }
    })
}

atualizandoUser(user,funcionarios)
setInterval(atualizandoUser(user, funcionarios),5000)

const listaSidebarBtn = [dashBtn, relatorioBtn, rncBtn, dashDetalhadoBtn, monitoramentoBtn, departamentoBtn, usuariosBtn, cxEntradaBtn, meuPerfilBtn]
const urlSidebar = [
    'homePage.html',
    'relatorioQualidade.html',
    'abrirRnc.html',
    'graficosDetalhados.html',
    'monitoramento.html',
    'departamentos.html',
    'usuarios.html',
    'cxEntrada.html',
    'meuPerfil.html'
]

for(let i = 0; i < listaSidebarBtn.length; i++) {
    listaSidebarBtn[i].addEventListener('click', () => {
        window.location.href = urlSidebar[i]
    })
}
 
 // Dados simulados
 const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
 const rootCauses = ['Processo', 'Treinamento', 'Equipamento', 'Material', 'Medição'];
 const severityLevels = ['Alto', 'Médio', 'Baixo'];

 // 1. Tendência de Não Conformidades
 new Chart(document.getElementById('trendChart'), {
     type: 'line',
     data: {
         labels: months,
         datasets: [{
             label: 'Não Conformidades',
             data: [12, 19, 15, 8, 22, 14],
             borderColor: '#3498db',
             tension: 0.1
         }]
     },
     options: {
         responsive: true,
         plugins: {
             legend: {
                 position: 'top',
             }
         }
     }
 });

 // 2. Causa Raiz
 new Chart(document.getElementById('rootCauseChart'), {
     type: 'bar',
     data: {
         labels: rootCauses,
         datasets: [{
             label: 'Ocorrências',
             data: [25, 18, 15, 12, 8],
             backgroundColor: '#e74c3c'
         }]
     }
 });

 // 3. Tempo Médio de Resolução
 new Chart(document.getElementById('resolutionTimeChart'), {
     type: 'bar',
     data: {
         labels: ['Crítico', 'Importante', 'Menor'],
         datasets: [{
             label: 'Dias',
             data: [2, 5, 8],
             backgroundColor: '#2ecc71'
         }]
     }
 });

 // 4. Reincidência
 new Chart(document.getElementById('recurrenceChart'), {
     type: 'bubble',
     data: {
         datasets: [{
             label: 'Reincidências',
             data: [
                 {x: 1, y: 10, r: 10},
                 {x: 2, y: 15, r: 15},
                 {x: 3, y: 8, r: 8},
                 {x: 4, y: 12, r: 12}
             ],
             backgroundColor: '#9b59b6'
         }]
     }
 });

 // 5. Ações Corretivas
 new Chart(document.getElementById('correctiveActionsChart'), {
     type: 'doughnut',
     data: {
         labels: ['Efetivas', 'Parcialmente Efetivas', 'Não Efetivas'],
         datasets: [{
             data: [70, 20, 10],
             backgroundColor: ['#27ae60', '#f1c40f', '#c0392b']
         }]
     }
 });

 // 6. Classificação por Severidade
 new Chart(document.getElementById('severityChart'), {
     type: 'bar',
     data: {
         labels: severityLevels,
         datasets: [{
             label: 'Quantidade',
             data: [8, 15, 22],
             backgroundColor: ['#e74c3c', '#f39c12', '#f1c40f']
         }]
     }
 });