const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
const cxEntradaBtn = document.querySelector('#cxEntradaBtn')
// const meuPerfilBtn = document.querySelector('#meuPerfilBtn')


const listaSidebarBtn = [dashBtn, relatorioBtn, rncBtn, dashDetalhadoBtn, monitoramentoBtn, departamentoBtn, usuariosBtn, cxEntradaBtn]
const urlSidebar = [
    'homePage.html',
    'relatorioQualidade.html',
    'abrirRnc.html',
    'graficosDetalhados.html',
    'monitoramento.html',
    'departamentos.html',
    'usuarios.html',
    'cxEntrada.html'
]

for(let i = 0; i < listaSidebarBtn.length; i++) {
    listaSidebarBtn[i].addEventListener('click', () => {
        window.location.href = urlSidebar[i]
    })
}

// Dados de exemplo
const rncs = [
    {
        id: 'NC001',
        sector: 'Produção',
        severity: 'high',
        manager: 'João Silva',
        reporter: 'Maria Santos',
        involvedPeople: ['AS', 'BT', 'CL'],
        description: 'Falha no processo de controle de qualidade.',
        deadline: '2024-04-15'
    },
    {
        id: 'NC002',
        sector: 'Logística',
        severity: 'medium',
        manager: 'Pedro Alves',
        reporter: 'Ana Costa',
        involvedPeople: ['DM', 'EF'],
        description: 'Atraso na entrega de materiais críticos.',
        deadline: '2024-04-20'
    },
    {
        id: 'NC003',
        sector: 'Qualidade',
        severity: 'low',
        manager: 'Carla Diniz',
        reporter: 'Roberto Gomes',
        involvedPeople: ['GH', 'IJ', 'KL'],
        description: 'Documentação incompleta no relatório mensal.',
        deadline: '2024-04-10'
    }
];

function createRNCCard(data) {
    const card = document.createElement('div');
    card.className = 'rnc-card';
    card.innerHTML = `
        <div class="rnc-header">
            <div>
                <h3 class="rnc-title">RNC ${data.id}</h3>
                <span class="severity-badge severity-${data.severity}">
                    ${getSeverityText(data.severity)}
                </span>
            </div>
        </div>
        <div class="rnc-details">
            <div class="rnc-detail-item">
                <span class="rnc-detail-label">Setor:</span>
                <span>${data.sector}</span>
            </div>
            <div class="rnc-detail-item">
                <span class="rnc-detail-label">Gestor:</span>
                <span>${data.manager}</span>
            </div>
            <div class="rnc-detail-item">
                <span class="rnc-detail-label">Reportado por:</span>
                <span>${data.reporter}</span>
            </div>
        </div>
        <div class="involved-people">
            <span class="rnc-detail-label">Envolvidos:</span>
            <div class="avatar-group">
                ${data.involvedPeople.map(person => `
                    <div class="avatar">${person}</div>
                `).join('')}
            </div>
        </div>
    `;
    return card;
}

function getSeverityText(severity) {
    const severityMap = {
        high: 'Alto',
        medium: 'Médio',
        low: 'Baixo'
    };
    return severityMap[severity] || severity;
}

function openModal() {
    document.getElementById('addRNCModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addRNCModal').style.display = 'none';
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('rncGrid');
    rncs.forEach(rnc => {
        container.appendChild(createRNCCard(rnc));
    });
});