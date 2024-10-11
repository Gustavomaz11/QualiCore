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
    const username = document.getElementById('username')
    const nomeUsuario = document.getElementById('nomeUsuario')

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

        let valorUserName = username.innerText;

        nomeUsuario.innerText = valorUserName;
        fullNameDisplay.innerText = valorUserName;

        var dados = {
            nomeUsuario: nomeUsuario.innerText,
            username: username.innerText,
            fullNameDisplay: fullNameDisplay.innerText,
            nomeCompleto: document.getElementById('nomeCompleto').innerText,
            telefone:  document.getElementById('telefone').innerText,
            instituicao:  document.getElementById('instituicao').innerText,
            position: document.getElementById('department').innerText 

        }

        localStorage.setItem('dadosUsuario', JSON.stringify(dados))
        window.dispatchEvent(new Event("storage"))
        console.log('Dados salvos:', dados)

       
        /*fullNameDisplay.innerText = username.innerText
        nomeUsuario.innerText = username.innerText*/
        // Aqui você poderia adicionar a lógica para salvar as alterações no servidor
    }
}

function changeProfilePicture(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const carregar = e.target.result
            document.getElementById('profilePicture').src = carregar;
            const avatarImage = document.getElementById('avatarImage')
            avatarImage.src = carregar
            avatarImage.style.display = 'block'
            
            document.getElementById('avatarIcon').style.display = 'none'
            
            localStorage.setItem('perfilImagem',carregar)
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

window.addEventListener('load',function(){
    var dadosSalvos = localStorage.getItem('dadosUsuario')
    if (dadosSalvos){
        var dados = JSON.parse(dadosSalvos)
        document.getElementById('nomeUsuario').innerText = dados.nomeUsuario;
        fullNameDisplay.innerText = dados.fullNameDisplay;
        username.innerText = dados.username
        document.getElementById('nomeCompleto').innerText = dados.nomeCompleto;
        document.getElementById('telefone').innerText = dados.telefone;
        document.getElementById('instituicao').innerText = dados.instituicao;
        document.getElementById('department').innerText = dados.position;
    }
    var imagemSalvo = localStorage.getItem('perfilImagem')
    if(imagemSalvo) {
        const avatarImage = document.getElementById('avatarImage')
        const profilePicture = document.getElementById('profilePicture')
        avatarImage.src = imagemSalvo
        profilePicture.src = imagemSalvo
        avatarImage.style.display = 'block'
        document.getElementById('avatarIcon').style.display = 'none'
    }
})

// Função para alternar o status (apenas para demonstração)
/*document.getElementById('status').addEventListener('click', function() {
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
});*/