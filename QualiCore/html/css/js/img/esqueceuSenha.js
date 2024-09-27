const esqueciSenha = document.querySelector('#esqueciSenha')
const criarConta = documen.querySelector('#criarConta')

const listaBtnLogin = [esqueciSenha ,criarConta]
const listaUrllogin = [
    'esqueceuSenha.html',
    'cadastro.html'
]

for(let c = 0; c < listaBtnLogin.length; c++) {
    listaBtnLogin[c].addEventListener('click', () => {
        window.location.href = listaUrllogin[c]
    })
}