const paginaRegistro = document.querySelector('.subDivisaoElementos h5 span')
const esqueciSenha = document.querySelector('.subDivisaoElementos span')
const entrar = document.querySelector('.divisaoElementos button')

const listaBtnLogin = [paginaRegistro, esqueciSenha, entrar]
const urlLogin = [
    'cadastro.html',
    'esqueceuSenha.html',
    'homePage.html'
]

for(let i = 0; i < listaBtnLogin.length; i++) {
    listaBtnLogin[i].addEventListener('click', () => {
        window.location.href = urlLogin[i]
    })
}

