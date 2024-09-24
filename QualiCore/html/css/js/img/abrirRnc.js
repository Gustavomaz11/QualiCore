document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rncForm');
    const tableContainer = document.getElementById('rncTableContainer');
    const table = document.getElementById('rncTable');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const newRow = table.insertRow(-1);
        newRow.innerHTML = `
            <td>${Math.floor(Math.random() * 1000)}</td>
            <td>${document.getElementById('setorAutuado').value}</td>
            <td>${document.getElementById('descrever').value.substring(0, 30)}...</td>
            <td>Arquivo1.pdf</td>
            <td>${new Date().toLocaleString()}</td>
            <td><button>Ver</button></td>
        `;

        // Show the table container with a fade-in effect
        tableContainer.style.display = 'block';
        setTimeout(() => {
            tableContainer.classList.add('fade-in');
        }, 10);

        // Clear the form
        form.reset();
    });
});

const dash = document.querySelector('#dash');

dash.addEventListener('click', () => {
    window.location.href = 'homePage.html'
})

const selectedOptions = new Set();

function filterOptions() {
    const input = document.getElementById('search');
    const filter = input.value.toLowerCase();
    const optionsContainer = document.getElementById('dropdown');
    const options = optionsContainer.getElementsByTagName('label');

    for (let i = 0; i < options.length; i++) {
        const txtValue = options[i].textContent.toLowerCase();
        options[i].style.display = txtValue.indexOf(filter) > -1 ? '' : 'none';
    }
}

function updateSelected(checkbox) {
    const value = checkbox.value;
    const selectedContainer = document.getElementById('selectedOptions');

    if (checkbox.checked) {
        selectedOptions.add(value);
        const item = document.createElement('div');
        item.className = 'selected-item';
        item.textContent = value; // Ou use uma descrição mais amigável
        const removeBtn = document.createElement('span');
        removeBtn.textContent = '✖';
        removeBtn.className = 'remove';
        removeBtn.onclick = function() {
            checkbox.checked = false;
            selectedOptions.delete(value);
            selectedContainer.removeChild(item);
        };
        item.appendChild(removeBtn);
        selectedContainer.appendChild(item);
    } else {
        selectedOptions.delete(value);
        const items = selectedContainer.getElementsByClassName('selected-item');
        for (let i = 0; i < items.length; i++) {
            if (items[i].textContent.includes(value)) {
                selectedContainer.removeChild(items[i]);
                break;
            }
        }
    }

    console.log(Array.from(selectedOptions)); // Mostra as opções selecionadas
}

document.getElementById('anexo').addEventListener('change', function() {
    const arquivos = this.files;
    const anexoTable = document.getElementById('anexoTable').getElementsByTagName('tbody')[0];

    for (let i = 0; i < arquivos.length; i++) {
        const newRow = anexoTable.insertRow(-1);
        
        newRow.insertCell(0).textContent = arquivos[i].name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.style.color = 'red';
        deleteBtn.onclick = function() {
            anexoTable.deleteRow(newRow.rowIndex - 1); // Remove a linha da tabela
            const input = document.getElementById('anexo');
            const dataTransfer = new DataTransfer();

            // Filtrar os arquivos que não foram excluídos
            for (let j = 0; j < input.files.length; j++) {
                if (input.files[j].name !== arquivos[i].name) {
                    dataTransfer.items.add(input.files[j]);
                }
            }
            input.files = dataTransfer.files; // Atualiza os arquivos no input
            if (anexoTable.rows.length === 0) {
                anexoTable.closest('table').style.display = 'none'; // Esconde a tabela se não houver anexos
            }
        };
        
        newRow.insertCell(1).appendChild(deleteBtn);
    }

    if (anexoTable.rows.length > 0) {
        anexoTable.closest('table').style.display = 'table'; // Mostra a tabela se houver anexos
    }
});