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

let isEditing = false;

function toggleEdit() {
    isEditing = !isEditing;
    const profileCard = document.querySelector('.profile-card');
    const editButton = document.querySelector('.edit-button');
    const editableElements = document.querySelectorAll('.info-value');
    const fullNameDisplay = document.getElementById('fullNameDisplay');

    if (isEditing) {
        profileCard.classList.add('editing');
        editButton.textContent = 'Salvar Alterações';
        editButton.style.backgroundColor = 'white';
        editButton.style.color = '#3498db';
        fullNameDisplay.contentEditable = true;
        editableElements.forEach(element => {
            if (element.id !== 'status') {
                element.contentEditable = true;
            }
        });
    } else {
        profileCard.classList.remove('editing');
        editButton.textContent = 'Editar Perfil';
        editButton.style.backgroundColor = 'transparent';
        editButton.style.color = 'white';
        fullNameDisplay.contentEditable = false;
        editableElements.forEach(element => {
            element.contentEditable = false;
        });
        // Aqui você poderia adicionar a lógica para salvar as alterações no servidor
    }
}

function changeProfilePicture(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            document.getElementById('profilePicture').src = e.target.result;
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Função para alternar o status (apenas para demonstração)
document.getElementById('status').addEventListener('click', function() {
    if (isEditing) {
        const statusElement = this;
        const currentStatus = statusElement.textContent.toLowerCase();
        const statusClasses = {
            'ativo': 'status-active',
            'inativo': 'status-inactive',
            'bloqueado': 'status-blocked'
        };
        const statusOrder = ['ativo', 'inativo', 'bloqueado'];
        
        let currentIndex = statusOrder.indexOf(currentStatus);
        let nextIndex = (currentIndex + 1) % statusOrder.length;
        let nextStatus = statusOrder[nextIndex];
        
        // Remover todas as classes de status
        Object.values(statusClasses).forEach(className => {
            statusElement.classList.remove(className);
        });
        
        // Adicionar a nova classe de status
        statusElement.classList.add(statusClasses[nextStatus]);
        statusElement.textContent = nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1);
    }
});