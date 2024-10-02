const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
const cxEntradaBtn = document.querySelector('#cxEntradaBtn')

const listaSidebarBtn = [dashBtn, relatorioBtn, rncBtn, dashDetalhadoBtn, monitoramentoBtn, departamentoBtn, usuariosBtn, cxEntradaBtn]
const urlSidebar = [
    'homePage.html',
    'inexistente.html',
    'abrirRnc.html',
    'dashDetalhe.html',
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

const notifications = [
    {
        id: 1,
        sender: {
            name: 'Douglas Abilio',
            avatar: 'DA'
        },
        ncNumber: 'RNC-2024-001',
        time: '2 horas atrás',
        content: 'Nova não conformidade identificada no processo de controle de qualidade.',
        status: 'pending',
        unread: true,
        involvedUsers: [
            { initials: 'WS', name: 'Weber Santana' },
            { initials: 'MN', name: 'Marcelo Nascimento' },
            { initials: 'JS', name: 'Juliana Santana' }
        ]
    },
    {
        id: 2,
        sender: {
            name: 'Adriano Menezes',
            avatar: 'AM'
        },
        ncNumber: 'RNC-2024-002',
        time: '4 horas atrás',
        content: 'Atualização na resolução da não conformidade do setor de produção.',
        status: 'progress',
        unread: false,
        involvedUsers: [
            { initials: 'OB', name: 'Ovidio Batista' },
            { initials: 'RF', name: 'Rafael Ferreira' }
        ]
    }
];

function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = '';

    notifications.forEach(notification => {
        const card = document.createElement('div');
        card.className = `notification-card ${notification.unread ? 'unread' : ''}`;
        
        const statusText = notification.status === 'pending' ? 'Pendente' : 'Em andamento';
        const statusClass = notification.status === 'pending' ? 'status-pending' : 'status-progress';

        card.innerHTML = `
            <div class="notification-header">
                <div class="sender-info">
                    <div class="avatar">${notification.sender.avatar}</div>
                    <div class="sender-details">
                        <span class="sender-name">${notification.sender.name}</span>
                        <span class="notification-time">${notification.time}</span>
                    </div>
                </div>
                <span class="nc-number">${notification.ncNumber}</span>
            </div>
            <div class="notification-content">
                ${notification.content}
            </div>
            <div class="involved-users">
                <div class="involved-avatars">
                    ${notification.involvedUsers.map(user => 
                        `<div class="involved-avatar" title="${user.name}">${user.initials}</div>`
                    ).join('')}
                </div>
                <span class="involved-count">${notification.involvedUsers.length} envolvidos</span>
            </div>
            <div class="notification-footer">
                <span class="status-badge ${statusClass}">${statusText}</span>
                <div class="action-buttons">
                    <button class="action-btn secondary-btn">Ignorar</button>
                    <button class="action-btn primary-btn">Ver detalhes</button>
                </div>
            </div>
        `;

        notificationsList.appendChild(card);
    });
}

// Filtros
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        // Aqui você pode adicionar a lógica de filtro real
    });
});

// Inicializa a renderização das notificações
renderNotifications();