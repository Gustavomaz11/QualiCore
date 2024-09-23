document.getElementById('rncForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const setor = document.getElementById('setorAutuado').value;
    const descricao = document.getElementById('descrever').value;
    const arquivos = document.getElementById('anexo').files;
    const data = new Date().toLocaleString();

    const table = document.getElementById('rncTable');
    const newRow = table.insertRow(-1);

    newRow.insertCell(0).textContent = setor;
    newRow.insertCell(1).textContent = descricao;
    newRow.insertCell(2).textContent = Array.from(arquivos).map(file => file.name).join(', ');
    newRow.insertCell(3).textContent = data;

    //Aqui Cria o botão da tabela
    const button = document.createElement('button')
    button.style.padding = '10px'
    button.style.backgroundColor = 'red'
    button.style.color = '#fff'
    button.style.border = 'none'
    button.style.cursor = 'pointer'
    button.style.borderRadius = '5px'
    button.textContent = 'Excluir'

    button.onclick = function() {
        alert(`Quando apertar aqui vai excluir a linha: ${setor}`)
    }

    newRow.insertCell(4).appendChild(button)

    table.style.display = 'table';

    // Reset form
    this.reset();
});

const dash = document.querySelector('#dash');

dash.addEventListener('click', () => {
    window.location.href = 'homePage.html'
})