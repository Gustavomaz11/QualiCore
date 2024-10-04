const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
const cxEntradaBtn = document.querySelector('#cxEntradaBtn')
const meuPerfilBtn = document.querySelector('#meuPerfilBtn')


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