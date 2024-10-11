const botaoPerfil = document.getElementById('botaoPerfil');
const menuPerfil = document.getElementById('menuPerfil');
const modal = document.querySelector(".modalPerfil");
const btn = document.getElementById("meuPerfilBtn");
const closeBtn = document.querySelector(".fecharModal");
const rncForm = document.querySelector('#rncForm')

const dashBtn = document.querySelector('#dashBtn')
const relatorioBtn = document.querySelector('#relatorioBtn')
const rncBtn = document.querySelector('#rncBtn')
const dashDetalhadoBtn = document.querySelector('#dashDetalhadoBtn')
const monitoramentoBtn = document.querySelector('#monitoramentoBtn')
const departamentoBtn = document.querySelector('#departamentoBtn')
const usuariosBtn = document.querySelector('#usuariosBtn')
const cxEntradaBtn = document.querySelector('#cxEntradaBtn')
const meuPerfilBtn = document.querySelector('#meuPerfilBtn')

// inputs 
const radios = document.querySelectorAll('#origem')
const descrever  = document.querySelector('#descrever')
const anexo = document.querySelector('#anexo')
const acaoImediata = document.querySelector("#acaoImediata")
const investigacao = document.querySelector('#investigacao')
const setorAutuado = document.querySelector('#setorAutuado')

// pegando usuario
let user = localStorage.getItem('login')
if(user != null)
    user = JSON.parse(user)

if(user == null)
    window.location.href = 'index.html';

const nome = document.querySelector('#nome')
nome.innerText = user.nome?user.nome:'xxxx'

// pegando funcionarios
let funcionarios = localStorage.getItem('funcionarios')
if(funcionarios != null)
    funcionarios = JSON.parse(funcionarios)

// limpando o cash
const btnlimparCash = document.querySelector('#limparCash')
btnlimparCash.addEventListener('click',()=>{
    localStorage.removeItem('rnc')
    localStorage.removeItem('lengthRnc')
    console.log(funcionarios)
    funcionarios.map((funcionario)=>{
        funcionario.mensagens = []
    })
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    localStorage.removeItem('login')
    window.location.href = 'index.html';

})

//
let gestorSetor = funcionarios.filter((funcionario)=> {
    if(funcionario.setor.sigla == user.setor.sigla && funcionario.cargo.includes('Gerente'))
        return funcionario
})

setorAutuado.disabled  = true
setorAutuado.value = gestorSetor[0].setor.nome


function atualizandoUser (user, funcionarios){
    user = localStorage.getItem('login')
    if(user != null)
        user = JSON.parse(user)

    console.log(user)

    funcionarios = localStorage.getItem('funcionarios')
    if(funcionarios != null)
        funcionarios = JSON.parse(funcionarios)

    funcionarios?.map((funcionario)=>{
        if(funcionario.email == user.email){
            funcionario.mensagens.map((menssagem)=>{
                console.log(menssagem)
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


if(user == null)
    window.location.href = 'index.html';

const rnc = {
    enquadramento:null,
    origem:null,
    descricao:null,
    anexos:[],
    acaoImediata:null,
    investigacao:null,
    setorAutuado:null,
    data:null,
    hora:null,
    criador:null,
    severidade:null,
    status:'analise',
    tipo:null,
    setorAtuar:null,
    linhaDoTempo:[],
    pessoasAnexadas:[],
    quem:null,
    numero:1
}

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
        deleteBtn.onclick = function(evt) {
            let nomeAnexo = evt.target.parentNode.parentNode.firstChild.innerText
            rnc.anexos = rnc.anexos.filter((anexo)=> anexo != nomeAnexo)
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
        rnc.anexos.push(arquivos[i].name);
    }
    
    if (anexoTable.rows.length > 0) {
        anexoTable.closest('table').style.display = 'table'; // Mostra a tabela se houver anexos
    }
});

// função para mandar as informação da rnc pro localstore
rncForm.addEventListener('submit',(evt)=>{
    evt.preventDefault()
    const data = new Date()
    let dia = data.getDate() < 10?"0"+data.getDate():data.getDate()
    let mes = data.getMonth() + 1 < 10?"0"+data.getMonth():data.getMonth()+1
    let ano = data.getFullYear()
    let hora = data.getHours() <10?"0"+data.getHours():data.getHours()
    let minutos = data.getMinutes() < 10?"0"+data.getMinutes():data.getMinutes()
    let radioCheck = null
    
    radios.forEach((radio)=>{
        if(radio.checked){
            radioCheck = radio.value
        }
    })
    rnc.enquadramento=Array.from(selectedOptions)
    rnc.origem=radioCheck
    rnc.descricao=descrever.value
    rnc.acaoImediata= acaoImediata.value
    rnc.investigacao= investigacao.value
    rnc.setorAutuado = setorAutuado.value 
    rnc.data = `${dia}/${mes}/${ano}`
    rnc.hora = `${hora}:${minutos}`
    rnc.criador = user.nome
    rnc.linhaDoTempo = [] 
    rnc.linhaDoTempo.push({
        criador:{nome:rnc.criador,avatar:user.avatar,email:user.email,setor:user.setor},
        data:rnc.data,
        hora:rnc.hora,
        status:'analise'
    })
    rnc.pessoasAnexadas.push({
        nome:rnc.criador,
        avatar:user.avatar,
        email:user.email,
        setor:user.setor
    })
    if(JSON.parse(localStorage.getItem('rnc')) != null){
        const rncs = JSON.parse(localStorage.getItem('rnc'))
        localStorage.setItem('lengthRnc', rncs.length)
        rnc.numero = Math.floor(Math.random() * 9999999999)
        rncs.push(rnc)
        localStorage.setItem('rnc', JSON.stringify(rncs))
    }else{
        localStorage.setItem('lengthRnc', 0)
        localStorage.setItem('rnc', JSON.stringify([rnc]))
    }
})
