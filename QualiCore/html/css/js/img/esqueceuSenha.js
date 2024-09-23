const voltarLogin = document.querySelector('.subDivisaoElementosSenha #login')
const voltarCadastro = document.querySelector('.subDivisaoElementosSenha #cadastro')

voltarLogin.addEventListener('click', () => {
    window.location.href = 'index.html'
})

voltarCadastro.addEventListener('click', () => {
    window.location.href = 'cadastro.html'
})