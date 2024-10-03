// Modal
const modal = document.getElementById("rncDetailsModal");
const closeBtn = document.getElementsByClassName("close")[0];
const saveBtn = document.getElementById("saveBtn");
const metodoOutroTexto = document.getElementById("metodoOutroTexto");

// Sidebar Navigation
const sidebarButtons = {
    dashBtn: 'homePage.html',
    relatorioBtn: 'relatorioQualidade.html',
    rncBtn: 'abrirRnc.html',
    dashDetalhadoBtn: 'dashDetalhe.html',
    monitoramentoBtn: 'monitoramento.html',
    departamentoBtn: 'departamentos.html',
    usuariosBtn: 'usuarios.html',
    cxEntradaBtn: 'cxEntrada.html'
};

Object.keys(sidebarButtons).forEach(buttonId => {
    const button = document.querySelector(`#${buttonId}`);
    button.addEventListener('click', () => {
        window.location.href = sidebarButtons[buttonId];
    });
});

// Kanban Card and Column Functionality
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-cards');

    let draggedCard = null;

    // Funções de arrastar
    function handleDragStart(e) {
        draggedCard = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        columns.forEach(column => column.classList.remove('drag-over'));
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        e.stopPropagation();
        if (draggedCard !== this) {
            this.classList.remove('drag-over');
            this.appendChild(draggedCard);
            updateColumnCounts();
        }
        return false;
    }

    function openModalOnDoubleClick(e) {
        const rncData = {
            numero: "001",
            dataHora: '01/08/2024 - 14:00',
            setorAutuante: 'Tecnologia da Informação',
            origem: 'Reclamação',
            severidade: 'Alta',
            status: 'analise',
            enquadramento: 'ABNT NBR ISO 9001:2015'
        };

        document.getElementById("rncNumber").textContent = rncData.numero;
        document.querySelector('#data-hora').value = rncData.dataHora;
        document.querySelector('#origem').value = rncData.origem;
        document.querySelector('#setor-autuante').value = rncData.setorAutuante;
        document.querySelector('#enquadramento').value = rncData.enquadramento;
        document.querySelector('#status').value = rncData.status
        modal.style.display = "block";
    }

    // Add event listeners to cards and columns
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dblclick', openModalOnDoubleClick);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('dragenter', handleDragEnter);
        column.addEventListener('dragleave', handleDragLeave);
        column.addEventListener('drop', handleDrop);
    });

    function updateColumnCounts() {
        columns.forEach(column => {
            const count = column.children.length;
            const countSpan = column.parentElement.querySelector('.column-count');
            countSpan.textContent = count;
        });
    }

    // Add card button functionality
    const addButtons = document.querySelectorAll('.add-card-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const column = this.closest('.kanban-column').querySelector('.kanban-cards');
            const newCard = createNewCard();
            column.appendChild(newCard);
            updateColumnCounts();
        });
    });

    function createNewCard() {
        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.draggable = true;
        card.innerHTML = `
            <div class="card-priority">Nova tarefa</div>
            <div class="card-title">Clique para editar</div>
            <div class="card-description">Adicione uma descrição</div>
            <div class="card-footer">
                <div class="assignees">
                    <div class="assignee">+</div>
                </div>
                <div class="metrics">
                    <div class="metric">0</div>
                    <div class="metric">0</div>
                </div>
            </div>
        `;

        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dblclick', openModalOnDoubleClick);

        return card;
    }

    // Inicializa os contadores
    updateColumnCounts();

    // Funções para abrir e fechar o modal de Detalhes de RNC

    function closeModal() {
        modal.style.display = "none";
    }

    closeBtn.onclick = closeModal;

    saveBtn.onclick = function () {
        console.log("Salvando dados...");
        closeModal();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Funções para troca de abas no modal
    const detalhamentoRncBtn = document.querySelector('#detalhamentoBtn');
    const andamentoBtn = document.querySelector('#andamentoBtn');
    const conclusaoBtn = document.querySelector('#conclusaoBtn');

    const abaDetalhamento = document.querySelector('#detalhamento');
    const abaAndamento = document.querySelector('#andamento');
    const abaConclusao = document.querySelector('#conclusao');

    const listaDetalhesBtn = [detalhamentoRncBtn, andamentoBtn, conclusaoBtn];
    const abas = [abaDetalhamento, abaAndamento, abaConclusao];

    function resetAbas() {
        abas.forEach(aba => aba.style.display = 'none');
        listaDetalhesBtn.forEach(btn => btn.classList.remove('active'));
    }

    function inicializarAba() {
        resetAbas();
        abaDetalhamento.style.display = 'flex';
        detalhamentoRncBtn.classList.add('active');
    }

    for (let z = 0; z < listaDetalhesBtn.length; z++) {
        listaDetalhesBtn[z].addEventListener('click', (e) => {
            e.preventDefault();
            resetAbas();
            abas[z].style.display = 'flex';
            listaDetalhesBtn[z].classList.add('active');
        });
    }

    inicializarAba();
});
