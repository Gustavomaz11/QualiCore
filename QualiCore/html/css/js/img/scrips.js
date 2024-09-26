const paginaRegistro = document.querySelector('.subDivisaoElementos h5 span')
const esqueciSenha = document.querySelector('.subDivisaoElementos span')
const entrar = document.querySelector('.divisaoElementos button')

const listaBtnLogin = [paginaRegistro, esqueciSenha]
const urlLogin = [
    'cadastro.html',
    'esqueceuSenha.html',
    
]

for(let i = 0; i < listaBtnLogin.length; i++) {
    listaBtnLogin[i].addEventListener('click', () => {
        window.location.href = urlLogin[i]
    })
}

//Validação pra testar usuario e senha

const nomeUsuarios = ['admin@fsph.gov.br', 'gmtrindade@fsph.gov.br', 'laraevlyn@fsph.gov.br', 'mateusfraga@fsph.gov.br']
const tiposUsuario = ['administrador', 'controlador', 'gestorDepartamento', 'colaborador']
const senhasUsuarios = ['123456', 'secreta1995', '00112233', '44556677']
const emailUsuario = document.querySelector('#email')
const senhaUsuario = document.querySelector('#senha')


entrar.addEventListener('click', (e) => {
    e.preventDefault()
    
    let validacao = false

    for(let z = 0; z < nomeUsuarios.length; z++) {
        if(emailUsuario.value === nomeUsuarios[z] && senhaUsuario.value === senhasUsuarios[z]) {
            alert(`Seja bem-vindo, seu usuário é ${nomeUsuarios[z]}, senha: ${senhasUsuarios[z]}, tipo de perfil: ${tiposUsuario[z]}`)
            validacao = true
            window.location.href = 'homePage.html'
            break
        } 
    }

    if(!validacao) {
        alert('Usuario ou senha errados')
    }


})







