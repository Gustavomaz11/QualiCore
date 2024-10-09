const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
const cxEntradaBtn = document.querySelector('#cxEntradaBtn')
const meuPerfilBtn = document.querySelector('#meuPerfilBtn')

// pegano o user
let user = localStorage.getItem('login')
user = JSON.parse(user)

// pegano os funcionarios
let funcionarios = localStorage.getItem('funcionarios')
funcionarios = JSON.parse(funcionarios)

function atualizandoUser (user,funcionarios){
    funcionarios.map((funcionario)=>{
        if(funcionario.email == user.email){
            funcionario.mensagens.map((menssagem)=>{
                if(menssagem.lida == false){
                    if(cxEntradaBtn.className == 'botaoIcone novaMenssagem') return
                    else
                        cxEntradaBtn.classList.add('novaMenssagem')
                    
                }
            })
        }
    })
}

atualizandoUser(user,funcionarios)
setInterval(atualizandoUser(user,funcionarios),5000)

// jeito de atualizar o user
funcionarios.map((funcionario)=>{
    if(funcionario.email == user.email)
        user = funcionario
})

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

    
    user?.mensagens.map((mensagem)=>{
        let semReptidos = []
        mensagem.rnc.linhadotempo.forEach((edicoes,index)=>{
            console.log(semReptidos[index])
            if(semReptidos[index -1]?.criador?.email != edicoes.criador.email){
                semReptidos.push(edicoes)
            }
        
        })

        mensagem["pessoasAnexadas"] = semReptidos
        console.log(mensagem)
    })

    user?.mensagens.forEach(notification => {
        const card = document.createElement('div');
        card.className = `notification-card ${notification.lida ? '' : 'unread'}`;
        
        const statusText = notification.rnc.status
        const statusClass = notification.rnc.status

        card.innerHTML = `
            <div class="notification-header">
                <div class="sender-info">
                    <div class="avatar">${notification.emissor.avatar}</div>
                    <div class="sender-details">
                        <span class="sender-name">${notification.emissor.nome}</span>
                        <span class="notification-time">${notification.data + " - " + notification.hora}</span>
                    </div>
                </div>
                <span class="nc-number">${notification.rnc.numero}</span>
            </div>
            <div class="notification-content">
                ${notification.menssagem}
            </div>
            <div class="involved-users">
                <div class="involved-avatars">
                    ${notification.pessoasAnexadas?.map(pessoas => 
                        `<div class="involved-avatar" title="${pessoas.criador.nome}">${pessoas.criador.avatar}</div>`
                    ).join('')}
                </div>
                <span class="involved-count">${notification.pessoasAnexadas?.length} envolvidos</span>
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