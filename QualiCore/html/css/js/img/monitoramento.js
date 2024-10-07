// Modal
const modal = document.getElementById("rncDetailsModal");
const closeBtn = document.getElementsByClassName("close")[0];
const metodoOutroTexto = document.getElementById("metodoOutroTexto");
const modalFooter = document.querySelector('.modal-footer')

//popup
const popup = document.querySelector('.popup')
const body = document.querySelector('aside')
body.addEventListener('click',()=>{
    if(popup.className == 'popup show'){
        popup.classList.remove('show')
    }else{
        popup.classList.add('show')
    }
})
// pegando a rnc pelo localstorege
let rnc = JSON.parse(localStorage.getItem('rnc'))
let lengthRnc = JSON.parse(localStorage.getItem('lengthRnc'))

// sistema que lança o popup quando tem uma nova rnc
const showPopup = ()=>{
    if(rnc?.length > lengthRnc){
        popup.classList.add('show')
        localStorage.setItem('lengthRnc', lengthRnc + 1)
    }else{
        popup.classList.remove('show')
    }
    rnc = JSON.parse(localStorage.getItem('rnc'))
    lengthRnc = JSON.parse(localStorage.getItem('lengthRnc'))
    
}
showPopup()

// Sidebar Navigation
const sidebarButtons = {
    dashBtn: 'homePage.html',
    relatorioBtn: 'relatorioQualidade.html',
    rncBtn: 'abrirRnc.html',
    dashDetalhadoBtn: 'graficosDetalhados.html',
    monitoramentoBtn: 'monitoramento.html',
    departamentoBtn: 'departamentos.html',
    usuariosBtn: 'usuarios.html',
    cxEntradaBtn: 'cxEntrada.html',
    meuPerfilBtn: 'meuPerfil.html'
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
        let element = e.target.parentNode
        element.setAttribute('data-status',e.target.parentNode.parentNode.getAttribute('data-column'))
        modificandoRncPeloId(element)
        updateColumnCounts()
        atualizandoRnc()
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

    // função que vai checar se atualizou a rnc e quando atualizar ela ira salvar
    function modificandoRncPeloId (rnc) {
        let array = JSON.parse(localStorage.getItem('rnc'))
        let modificacao = false
        array.map((indexRnc)=>{
            if(indexRnc.id == rnc.getAttribute('data-id')){
                if(indexRnc.status != rnc.getAttribute('data-status')){
                    indexRnc.status = rnc.getAttribute('data-status')
                    modificacao = true
                }
                if(indexRnc.severidade != rnc.getAttribute('data-severidade')){
                    indexRnc.severidade = rnc.getAttribute('data-severidade')
                    modificacao = true
                }
                if(indexRnc.setorAtuar != rnc.getAttribute('data-setorAtuar')){
                    indexRnc.setorAtuar = rnc.getAttribute('data-setorAtuar')
                    modificacao =  true
                }
            }
        })

        if(modificacao){
            localStorage.setItem('rnc', JSON.stringify(array))
        }
    }

    function openModalOnDoubleClick(e) {
        const saveBtn = document.getElementById("saveBtn");
        
        const rncData = {
            numero: `${e.getAttribute('data-id')<10? "00"+e.getAttribute('data-id'):"0"+e.getAttribute('data-id')}`,
            dataHora: `${e.getAttribute('data-data')} - ${e.getAttribute('data-hora')}`,
            setorAutuante: `${e.getAttribute('data-setorAutuado')}`,
            origem: `${e.getAttribute('data-origem')}`,
            severidade: `${e.getAttribute("data-severidade")!= null?e.getAttribute("data-severidade"):null}`,
            status: `${e.getAttribute('data-status')}`,
            enquadramento: `${e.getAttribute('data-enquadramento')}`,
            setorAtuar: `${e.getAttribute('data-setorAtuar')}`
        };

        document.getElementById("rncNumber").textContent = rncData.numero;
        document.querySelector('#data-hora').value = rncData.dataHora;
        document.querySelector('#origem').value = rncData.origem;
        document.querySelector('#setor-autuante').value = rncData.setorAutuante;
        document.querySelector('#enquadramento').value = rncData.enquadramento;
        const setorAtuar = document.querySelector('#setor-atuar')
        setorAtuar.value = rncData.setorAtuar
        const severidade = document.querySelector('#severidade')
        severidade.value = rncData.severidade
        const status = document.querySelector('#status')
        status.value = rncData.status
        const newSaveBtn = saveBtn.cloneNode(true);  // Clona o botão para remover os eventos antigos
        newSaveBtn.textContent = 'teste'
        saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);  // Substitui o botão antigo
        newSaveBtn.addEventListener('click',()=>{
            e.setAttribute('data-status',status.value)
            e.setAttribute('data-severidade',severidade.value)
            e.setAttribute('data-setorAtuar',setorAtuar.value)
            modificandoRncPeloId(e)
            atualizandoRnc()        
            closeModal()
        })
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

    const divsKanban = document.querySelectorAll('.kanban-cards')
    rnc?.map((elementoRnc)=>{
        divsKanban.forEach((div)=>{
            if(div.getAttribute('data-column') == elementoRnc.status){
                div.appendChild(reloadCard(elementoRnc))
            }
        })
    })

    // sistema que adiciona a nova rnc no hmtl
    function atualizandoRnc (){
        rnc = JSON.parse(localStorage.getItem('rnc'))
        divsKanban.forEach((div)=>{
            while(div.firstChild){ // removendo todos as rnc do html
                div.removeChild(div.firstChild)
            }
            rnc?.map((elementoRnc)=>{
                if(div.getAttribute('data-column') == elementoRnc.status){
                    div.appendChild(reloadCard(elementoRnc))
                }
            })
            updateColumnCounts()
        })
    }
    
    function addRncAtualizado (){
        rnc = JSON.parse(localStorage.getItem('rnc'))
        lengthRnc = JSON.parse(localStorage.getItem('lengthRnc'))
        if(rnc.length > lengthRnc){
            atualizandoRnc()
            showPopup()
            localStorage.setItem('lengthRnc', lengthRnc + 1)
        }
    }

    setInterval(addRncAtualizado, 5000)

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

    function reloadCard(rnc) {
        const card = document.createElement('div');
        Object.entries(rnc).forEach(([key, value]) => {
            if(key === 'criador'){
                card.setAttribute(`data-${key}`, value?.nome)
            }else if (key === 'enquadramento')
                card.setAttribute(`data-${key}`, value.join(', '))
            else
                card.setAttribute(`data-${key}`, value)
        })
        card.className = 'kanban-card';
        card.draggable = true;
        card.innerHTML = `
                <div class="kanban-card" draggable="true">
                    <div class="card-priority">${rnc?.severidade!=null?rnc.severidade:'analise'}</div>
                    <div class="card-title">${rnc.enquadramento.length > 1?rnc.enquadramento[0] +" +"+rnc.enquadramento.length :rnc.enquadramento}</div>
                    <div class="card-description">Aberto por:  ${rnc.criador.nome}</div>
                    <div class="card-description">${rnc.setorAutuado}</div>
                    <div class="card-description">${rnc.data} - ${rnc.hora}</div>
                    <div class="card-footer">
                        <div class="assignees">
                            <div class="assignee">DA</div>
                            <div class="assignee">WS</div>s
                        </div>
                    </div>
                </div>
        `;
    
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dblclick', ()=>openModalOnDoubleClick(card));
    
        return card;
    }
    
    // Inicializa os contadores
    updateColumnCounts();

    // Funções para abrir e fechar o modal de Detalhes de RNC

    function closeModal() {
        modal.style.display = "none";
    }

    // closeBtn.onclick = closeModal;

    // saveBtn.onclick = function () {
    //     console.log("Salvando dados...");
    //     closeModal();
    // };

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
