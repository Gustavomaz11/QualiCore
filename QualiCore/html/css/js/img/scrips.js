
const loginForm = document.querySelector('.login-button')
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

const nomeUsuarios = ['admin@fsph.gov.br', 'gmtrindade@fsph.gov.br', 'laraevlyn@fsph.gov.br', 'mateusfraga@fsph.gov.br'];
const tiposUsuario = ['administrador', 'controlador', 'gestorDepartamento', 'colaborador'];
const senhasUsuarios = ['123456', 'secreta1995', '00112233', '44556677'];



loginForm.addEventListener('click', () => {
    
    const email = emailInput.value;
    const senha = senhaInput.value;

    let validacao = false;

    for (let i = 0; i < nomeUsuarios.length; i++) {
        if (email === nomeUsuarios[i] && senha === senhasUsuarios[i]) {
            validacao = true;
            window.location.href = 'homePage.html';
            let nome = nomeUsuarios[i].split('@')[0]
            localStorage.setItem('login',JSON.stringify({nome,email:nomeUsuarios[i]}))
            break;
        }
    }

    if (!validacao) {
        emailInput.classList.add('error');
        senhaInput.classList.add('error');
        popup.style.display = 'flex';
    }
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    emailInput.classList.remove('error');
    senhaInput.classList.remove('error');
});

// Para teste: Remova este bloco após verificar
console.log('Script carregado');
console.log('Formulário:', loginForm);
console.log('Popup:', popup);





