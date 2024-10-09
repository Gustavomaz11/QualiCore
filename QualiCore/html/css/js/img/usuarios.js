const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
const cxEntradaBtn = document.querySelector('#cxEntradaBtn')
const meuPerfilBtn = document.querySelector('#meuPerfilBtn')

// pegando usuario
let user = localStorage.getItem('login')
user = JSON.parse(user)

// pegando funcionarios
let funcionarios = localStorage.getItem('funcionarios')
funcionarios = JSON.parse(funcionarios)
// função que deixa a cor da carta laranja caso tenha alguam msg não vista


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


const departmentManagers = {
    'RH': 'Ana Costa',
    'TI': 'Carlos Santos',
    'Marketing': 'Juliana Oliveira',
    'Financeiro': 'Roberto Silva'
};

let profiles = [
    { id: 1, name: 'João Silva', department: 'TI', manager: 'Carlos Santos', status: 'active' },
    { id: 2, name: 'Maria Oliveira', department: 'RH', manager: 'Ana Costa', status: 'active' },
    { id: 3, name: 'Pedro Santos', department: 'Marketing', manager: 'Juliana Oliveira', status: 'blocked' }
];

function updateManager() {
    const departmentSelect = document.getElementById('userDepartment');
    const managerInput = document.getElementById('userManager');
    
    const selectedDepartment = departmentSelect.value;
    if (selectedDepartment) {
        managerInput.value = departmentManagers[selectedDepartment] || '';
    } else {
        managerInput.value = '';
    }
}

function addProfile(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value;
    const department = document.getElementById('userDepartment').value;
    const manager = document.getElementById('userManager').value;

    const newProfile = {
        id: profiles.length + 1,
        name: name,
        department: department,
        manager: manager,
        status: 'active'
    };

    profiles.push(newProfile);
    renderProfiles();
    closeModal();
    event.target.reset();
    document.getElementById('userManager').value = ''; // Limpa o campo do gestor
}

function renderProfiles() {
    const grid = document.getElementById('profilesGrid');
    grid.innerHTML = '';

    profiles.forEach(profile => {
        const card = document.createElement('div');
        card.className = 'profile-card';
        const userInitials = profile.name.split(' ').map(n => n[0]).join('');
        const statusClass = profile.status === 'active' ? 'status-active' : 'status-blocked';
        const statusText = profile.status === 'active' ? 'Ativo' : 'Bloqueado';

        card.innerHTML = `
            <div class="profile-header">
                <div class="profile-main-info">
                    <div class="avatar">${userInitials}</div>
                    <h3 class="profile-name">${profile.name}</h3>
                    <div class="profile-department">${profile.department}</div>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <div class="profile-actions">
                    <button class="action-btn block-btn" onclick="toggleProfileStatus(${profile.id})">
                        <i class="fas ${profile.status === 'active' ? 'fa-lock' : 'fa-lock-open'}"></i>
                    </button>
                    <button class="action-btn" onclick="removeProfile(${profile.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="manager-info">
                <div class="avatar">${profile.manager.split(' ').map(n => n[0]).join('')}</div>
                <div>
                    <div style="font-weight: bold;">${profile.manager}</div>
                    <div style="font-size: 0.875rem; color: #7f8c8d;">Gestor</div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

function openModal() {
    document.getElementById('addProfileModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addProfileModal').style.display = 'none';
    document.getElementById('addProfileForm').reset();
    document.getElementById('userManager').value = ''; // Limpa o campo do gestor
}

function addProfile(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value;
    const department = document.getElementById('userDepartment').value;
    const manager = document.getElementById('userManager').value;

    const newProfile = {
        id: profiles.length + 1,
        name: name,
        department: department,
        manager: manager,
        status: 'active'
    };

    profiles.push(newProfile);
    renderProfiles();
    closeModal();
    event.target.reset();
}

function removeProfile(id) {
    if (confirm('Tem certeza que deseja remover este perfil?')) {
        profiles = profiles.filter(profile => profile.id !== id);
        renderProfiles();
    }
}

function toggleProfileStatus(id) {
    const profile = profiles.find(profile => profile.id === id);
    if (profile) {
        profile.status = profile.status === 'active' ? 'blocked' : 'active';
        renderProfiles();
    }
}

document.getElementById('addProfileForm').addEventListener('submit', addProfile);
window.onclick = function(event) {
    const modal = document.getElementById('addProfileModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Inicializa a renderização dos perfis
renderProfiles();
