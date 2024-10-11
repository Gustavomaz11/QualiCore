const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
const cxEntradaBtn = document.querySelector('#cxEntradaBtn')
const meuPerfilBtn = document.querySelector('#meuPerfilBtn')
const DivlinhaDoTempo = document.querySelector('.linhaDoTempo')
const bodyTabelaRnc = document.querySelector('#bodyTabelaRNC')
const selectQuem = document.querySelector('#quem')
const modal = document.getElementById("rncDetailsModal");
const rncNumber = document.querySelector('#rncNumber')
const notificationsList = document.getElementById('notificationsList');


//tab btns
const detalhamentoRncBtn = document.querySelector('#detalhamentoBtn');
const andamentoBtn = document.querySelector('#andamentoBtn');
const conclusaoBtn = document.querySelector('#conclusaoBtn');

// pegano o user
let user = localStorage.getItem('login')
if(user != null)
    user = JSON.parse(user)

if(user == null)
    window.location.href = 'index.html';

// pegano os funcionarios
let funcionarios = localStorage.getItem('funcionarios')
funcionarios = JSON.parse(funcionarios)

function atualizandoUser (user, funcionarios){
    user = localStorage.getItem('login')
    if(user != null)
        user = JSON.parse(user)

    funcionarios = localStorage.getItem('funcionarios')
    if(funcionarios != null)
        funcionarios = JSON.parse(funcionarios)

    funcionarios?.map((funcionario)=>{
        if(funcionario.email == user.email){
            funcionario.mensagens.map((menssagem)=>{
                if(menssagem.lida == false){
                    if(cxEntradaBtn.className == 'botaoIcone novaMenssagem') return
                    else
                        cxEntradaBtn.classList.add('novaMenssagem')
                }
                else{
                    cxEntradaBtn.classList.remove('novaMenssagem')
                }
            })
        }
    })
}

atualizandoUser(user,funcionarios)
setInterval(atualizandoUser(user, funcionarios),5000)

// jeito de atualizar o user
funcionarios.map((funcionario)=>{
    if(funcionario.email == user.email)
        user = funcionario
})

const listaSidebarBtn = [dashBtn, relatorioBtn, rncBtn, dashDetalhadoBtn, monitoramentoBtn, departamentoBtn, usuariosBtn, cxEntradaBtn, meuPerfilBtn]
const urlSidebar = [
    'homePage.html',
    'relatorioQualidade.html',
    'abrirRnc.html',
    'graficosDetalhados.html',
    'monitoramento.html',
    'departamentos.html',
    'usuarios.html',
    'cxEntrada.html',
    'meuPerfil.html'
]

for(let i = 0; i < listaSidebarBtn.length; i++) {
    listaSidebarBtn[i].addEventListener('click', () => {
        window.location.href = urlSidebar[i]
    })
}

function marcarComoLida (notification) {
    let mudou = false
    
    funcionarios.map((funcionario)=>{
        funcionario.mensagens.forEach((mensagem)=>{
        if(notification?.rnc?.numero == mensagem.rnc.numero){
            notification.lida = true
            mensagem = notification
            mudou = true
        }
        })
    })
    console.log(mudou)

    if(mudou){
        localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
        funcionarios = localStorage.getItem('funcionarios')
        funcionarios = JSON.parse(funcionarios)
        console.log(funcionarios)
    }
}

function renderNotifications() {
    let user = localStorage.getItem('login')
    user = JSON.parse(user)
    funcionarios.map((funcionario)=>{
        if(funcionario.email == user.email){
            user = funcionario
        }
    })
    notificationsList.innerHTML = '';
    user?.mensagens.forEach(notification => {
        const card = document.createElement('div');
        card.className = `notification-card ${notification.lida ? '' : 'unread'}`;
        card.addEventListener('click', ()=>{
            openModalOnDoubleClick(notification.rnc)
            marcarComoLida(notification)
        })
        const statusText = notification.rnc.status
        const statusClass = notification.rnc.status
        card.innerHTML = `
            <div class="notification-header">
                <div class="sender-info">
                    <div class="avatar">${notification.emissor.avatar}</div>
                    <div class="sender-details">
                        <span class="sender-name">${notification.emissor.nome}</span>
                        <span class="notification-time">${notification.data + " - " + notification.hora}</span>
                    </div>
                </div>
                <span class="nc-number">${notification.rnc.numero}</span>
            </div>
            <div class="notification-content">
                ${notification.menssagem}
            </div>
            <div class="involved-users">
                <div class="involved-avatars">
                    ${notification.rnc.pessoasAnexadas?.map(pessoas => 
                        `<div class="involved-avatar" title="${pessoas.nome}">${pessoas.avatar}</div>`
                    ).join('')}
                </div>
                <span class="involved-count">${notification.rnc.pessoasAnexadas?.length} envolvidos</span>
            </div>
            <div class="notification-footer">
                <span class="status-badge ${statusClass}">${statusText}</span>
                <div class="action-buttons">
                    <button class="action-btn secondary-btn">Ignorar</button>
                    <button class="action-btn primary-btn">Ver detalhes</button>
                </div>
            </div>
        `;

        notificationsList.appendChild(card);
    });
}

// Filtros
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        // Aqui você pode adicionar a lógica de filtro real
    });
});

function closeModal() {
    modal.style.display = "none";
    notificationsList.innerHTML = ''
    
    renderNotifications()
}

// Inicializa a renderização das notificações
renderNotifications();

function openModalOnDoubleClick(rncData) {
    console.log(rncData)
    const data = new Date()
    let dia = data.getDate() < 10?"0"+data.getDate():data.getDate()
    let mes = data.getMonth() + 1 < 10?"0"+data.getMonth():data.getMonth()+1
    let ano = data.getFullYear()
    let hora = data.getHours() <10?"0"+data.getHours():data.getHours()
    let minutos = data.getMinutes() < 10?"0"+data.getMinutes():data.getMinutes()
    let fullHora =  `${hora}:${minutos}`
    let fullData =  `${dia}/${mes}/${ano}`
    let {linhaDoTempo} = rncData
    DivlinhaDoTempo.innerHTML = ''
    linhaDoTempo.map((mudanca,index)=>{
        let div = document.createElement('div')
        div.classList.add('itemLinhaDoTempo')
        div.innerHTML = `
            <div class="conteudoLinhaDoTempo">
                <p>${mudanca.data} - ${mudanca.hora}<br>${index  == 0?'Aberto por ' + mudanca.criador.nome: mudanca.menssagem}</p>
            </div>
        `
        DivlinhaDoTempo.appendChild(div)
    })
    // rncData.anexos = rncData.anexos.length>1?rncData.anexos.split(', '):rncData.anexos[0]
    bodyTabelaRnc.innerHTML = ''
    rncData.anexos.map((anexo)=>{
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${anexo}</td>
            <td>${rncData.dataHora}</td>
            <td>
                <button class="verBtn">Ver</button>
                <button class="aceitarBtn">Aceitar</button>
                <button class="recusarBtn">Recusar</button>
            </td>
        `

        bodyTabelaRnc.appendChild(tr)
    })
    document.getElementById("rncNumber").textContent = rncData.numero;
    document.querySelector('#data-hora').value = rncData.data + " - " + rncData.hora;
    document.querySelector('#origem').value = rncData.origem;
    document.querySelector('#setor-autuante').value = rncData.setorAutuante;
    document.querySelector('#enquadramento').value = rncData.enquadramento;
    const tipo = document.getElementsByName('tipoRnc')
    tipo.value = rncData.tipo
    const setorAtuar = document.querySelector('#setor-atuar')
    setorAtuar.value = rncData.setorAtuar
    const severidade = document.querySelector('#severidade')
    severidade.value = rncData.severidade
    const status = document.querySelector('#status')
    status.value = rncData.status
    rncNumber.value = rncData.numero
    const newSaveBtn = saveBtn.cloneNode(true);  // Clona o botão para remover os eventos antigos
    newSaveBtn.textContent = 'teste'
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);  // Substitui o botão antigo
    if(rncData.setorAtuar == "null"){
        andamentoBtn.disabled = true
    }else{
        andamentoBtn.disabled = false
    }
    if(rncData.status != 'concluido'){
        conclusaoBtn.disabled = true
    }else{
        conclusaoBtn.disabled = false
    }
    let funcioanriosSetorAtuar = funcionarios.filter((funcionario)=> funcionario.setor.sigla == rncData.setorAtuar)
    selectQuem.innerHTML = `
        <option value="null">--Selecione--</option>
    `
    funcioanriosSetorAtuar?.map((funcionarioSetorAtuar)=>{
        const options = document.createElement('option')
        options.value = funcionarioSetorAtuar.email
        options.innerText = `${funcionarioSetorAtuar.nome} - ${funcionarioSetorAtuar.setor.sigla}` 
        selectQuem.appendChild(options)
    })

    selectQuem.value = rncData.quem

    newSaveBtn.addEventListener('click',()=>{
        rncData.status = status.value
        rncData.severidade = severidade.value

        let gestor = pegarGestorDoSetor(setorAtuar.value)
        if(status.value != rncData.status){
            rncData.linhaDoTempo.push({
                criador: {nome:user.nome,setor:user.setor,avatar:user.avatar,email:user.email},
                hora:fullHora,
                data: fullData,
                menssagem: `status alterado para ${status.value} por: ${user.nome}`
            })
        }
        if(severidade.value != rncData.severidade){
            rncData.linhaDoTempo.push({
                criador: {nome:user.nome,setor:user.setor,avatar:user.avatar,email:user.email},
                hora:fullHora,
                data: fullData,
                menssagem: `severidade alterada para ${severidade.value} por: ${user.nome}`
            }) 
        }
        if(setorAtuar.value != rncData.setorAtuar){
            rncData.linhaDoTempo.push({
                criador: {nome:user.nome,setor:user.setor,avatar:user.avatar,email:user.email},
                hora:fullHora,
                data: fullData,
                menssagem: `setor ${setorAtuar.value} foi anexado por: ${user.nome}`
            }) 
        }

        rncData.pessoasAnexadas.push({nome:user.nome,avatar:user.avatar,email:user.email,setor:user.setor})
        rncData.pessoasAnexadas = naoRepete(rncData.pessoasAnexadas)

        rncData.quem = selectQuem.value
        rncData.severidade = severidade.value
        rncData.origem = origem.value

        
        if(rncData.setorAtuar != setorAtuar.value){ // checando se o setor mudou para não ter um span de msg
            rncData.setorAtuar = setorAtuar.value
            addMsg(gestor,user,rncData,fullData, fullHora,"Nova não conformidade identificada")
        }
        if(selectQuem.value != "null"){    
            let funcionarioSelecionado = funcioanriosSetorAtuar.filter((funcionarioSetorAtuar)=>funcionarioSetorAtuar.email == selectQuem.value)
            rncData.pessoasAnexadas.push({nome:funcionarioSelecionado[0].nome,avatar:funcionarioSelecionado[0].avatar,email:funcionarioSelecionado[0].eamil,setor:funcionarioSelecionado[0].setor})
            rncData.pessoasAnexadas = naoRepete(rncData.pessoasAnexadas)
            rncData.linhaDoTempo.push({
                criador: {nome:user.nome,setor:user.setor,avatar:user.avatar,email:user.email},
                hora:fullHora,
                data: fullData,
                menssagem: `${user.nome} anexou ${funcionarioSelecionado[0].nome}`
            })
            addMsg(funcionarioSelecionado[0],user,rncData,fullData,fullHora,"Você foi anexado a um não conformidade")
        }
        console.log(rncData)
        modificandoRncPeloId(rncData)
        closeModal()
    })
    modal.style.display = "block";
}

function modificandoRncPeloId (rnc) {
    let funcionairos = JSON.parse(localStorage.getItem('funcionarios'))
    let modificacao = false
    funcionairos.map((funcioanrio)=>{
        if(funcioanrio.email == user.email){
            funcioanrio.mensagens.map((mensagem)=>{
                if(mensagem.rnc.numero == rnc.numero){
                if(mensagem.rnc.status != rnc.status){
                    mensagem.rnc.status = rnc.status
                    mensagem.rnc.linhaDoTempo = rnc.linhaDoTempo
                    modificacao = true
                }
                if(mensagem.rnc.severidade != rnc.severidade){
                    mensagem.rnc.severidade = rnc.severidade
                    modificacao = true
                }
                if(mensagem.rnc.setorAtuar != rnc.setorAtuar){
                    mensagem.rnc.setorAtuar = rnc.setorAtuar
                    mensagem.rnc.pessoasAnexadas = rnc.pessoasAnexadas
                    modificacao =  true
                }
                if(mensagem.rnc.quem != rnc.quem){
                    mensagem.rnc.quem =  rnc.quem
                    mensagem.rnc.pessoasAnexadas = rnc.pessoasAnexadas
                    modificacao = true
                }
                }
            })
        }
    })
    if(modificacao){
        let arrayRnc = JSON.parse(localStorage.getItem('rnc'))
        arrayRnc.map((indexRnc)=>{
            if(indexRnc.numero == rnc.numero){
                if(indexRnc.status != rnc.status){
                    indexRnc.status = rnc.status
                    indexRnc.linhaDoTempo = rnc.linhaDoTempo
                    modificacao = true
                }
                if(indexRnc.severidade != rnc.severidade){
                    indexRnc.severidade = rnc.severidade
                    modificacao = true
                }
                if(indexRnc.setorAtuar != rnc.setorAtuar){
                    indexRnc.setorAtuar = rnc.setorAtuar
                    indexRnc.pessoasAnexadas = rnc.pessoasAnexadas
                    modificacao =  true
                }
                if(indexRnc.quem != rnc.quem){
                    indexRnc.quem =  rnc.quem
                    indexRnc.pessoasAnexadas = rnc.pessoasAnexadas
                    modificacao = true
                }
            }
        })

        console.log(arrayRnc)

        localStorage.setItem('funcionarios', JSON.stringify(funcionairos))
        localStorage.setItem('rnc',JSON.stringify(arrayRnc))
    }
}

function addMsg (usuario,emissor,rnc,data,hora,menssagem) {
    usuario.mensagens.push({
        emissor:{nome:emissor.nome, avatar:emissor.avatar},
        lida:false,
        menssagem,
        data,
        hora,
        rnc
    })

    funcionarios.map((funcionario)=>{
        if(funcionario.email === usuario.email){
            funcionario = usuario
        }
    })

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
}

function pegarGestorDoSetor (siglaSetor){
    const gestor = funcionarios.filter((indexUser)=>{
        if(indexUser.setor.sigla == siglaSetor && indexUser.cargo == "Gerente Setor")
            return indexUser
    })

    return gestor?gestor[0]:gestor
}

function naoRepete (array){
    let noRepeat = []
    const set = new Set()
    array.forEach(user => {
        set.add(JSON.stringify(user))
    });
    set.forEach((user)=>{
        noRepeat.push(JSON.parse(user))
    })

    return noRepeat
}

window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Funções para troca de abas no modal

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