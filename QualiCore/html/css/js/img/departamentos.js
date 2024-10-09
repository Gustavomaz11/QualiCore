const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
const cxEntradaBtn = document.querySelector('#cxEntradaBtn')
const meuPerfilBtn = document.querySelector('#meuPerfilBtn')

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


let departments = [
    { id: 1, name: 'Recursos Humanos', manager: 'Adriano Menezes', status: 'active' },
    { id: 2, name: 'Tecnologia da Informação', manager: 'Douglas Abilio', status: 'active' },
    { id: 3, name: 'Marketing', manager: 'Juliana Oliveira', status: 'blocked' },
    
];

function renderDepartments() {
    const grid = document.getElementById('departmentsGrid');
    grid.innerHTML = '';

    departments.forEach(dept => {
        const card = document.createElement('div');
        card.className = 'department-card';
        const managerInitials = dept.manager.split(' ').map(n => n[0]).join('');
        const statusClass = dept.status === 'active' ? 'status-active' : 'status-blocked';
        const statusText = dept.status === 'active' ? 'Ativo' : 'Bloqueado';

        card.innerHTML = `
            <div class="department-header">
                <h3 class="department-name">${dept.name}</h3>
                <div class="department-actions">
                    <button class="action-btn block-btn" onclick="toggleDepartmentStatus(${dept.id})">
                        <i class="fas ${dept.status === 'active' ? 'fa-lock' : 'fa-lock-open'}"></i>
                    </button>
                    <button class="action-btn" onclick="removeDepartment(${dept.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <span class="status-badge ${statusClass}">${statusText}</span>
            <div class="manager-info">
                <div class="manager-avatar">${managerInitials}</div>
                <div>
                    <div style="font-weight: bold;">${dept.manager}</div>
                    <div style="font-size: 0.875rem; color: #7f8c8d;">Gestor</div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

function openModal() {
    document.getElementById('addDepartmentModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addDepartmentModal').style.display = 'none';
}

function addDepartment(event) {
    event.preventDefault();
    const name = document.getElementById('departmentName').value;
    const manager = document.getElementById('managerName').value;

    const newDepartment = {
        id: departments.length + 1,
        name: name,
        manager: manager,
        status: 'active'
    };

    departments.push(newDepartment);
    renderDepartments();
    closeModal();
    event.target.reset();
}

function removeDepartment(id) {
    if (confirm('Tem certeza que deseja remover este departamento?')) {
        departments = departments.filter(dept => dept.id !== id);
        renderDepartments();
    }
}

function toggleDepartmentStatus(id) {
    const department = departments.find(dept => dept.id === id);
    if (department) {
        department.status = department.status === 'active' ? 'blocked' : 'active';
        renderDepartments();
    }
}

document.getElementById('addDepartmentForm').addEventListener('submit', addDepartment);
window.onclick = function (event) {
    const modal = document.getElementById('addDepartmentModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Inicializa a renderização dos departamentos
renderDepartments();




