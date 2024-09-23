const paginaRegistro = document.querySelector('.subDivisaoElementos h5 span')
const esqueciSenha = document.querySelector('.subDivisaoElementos span')
const entrar = document.querySelector('.divisaoElementos button')
paginaRegistro.addEventListener('click', () => {
    window.location.href = 'cadastro.html'
})

esqueciSenha.addEventListener('click', () => {
    window.location.href = 'esqueceuSenha.html'
})

entrar.addEventListener('click', () => {
    window.location.href = 'homePage.html'
})

