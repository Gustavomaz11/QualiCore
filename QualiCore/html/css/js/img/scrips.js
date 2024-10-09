const loginForm = document.querySelector('.login-form');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');


const users = [
    {email: 'admin@fsph.gov.br',nome:'Jorge', avatar:"JO",senha: '123456', setor:{nome:"Recursos Humanos",id:1,sigla:"RH"}, cargo:"Gerente Geral", mensagens:[] },
    {email: 'gmtrindade@fsph.gov.br',nome:"Gustavo",avatar:"GU" ,senha: 'secreta1995', setor:{nome:"Tecnologia da Informação",id:2,sigla:"TI"}, cargo:"Gerente Setor", mensagens:[] },
    {email: 'laraevlyn@fsph.gov.br',nome:"Lara",avatar:"LA" ,senha: '00112233', setor:{nome:"Enfermaria",id:3,sigla:"ENF"}, cargo:"Gerente Setor", mensagens:[] },
    {email: 'mateusfraga@fsph.gov.br',nome:'Matheus', avatar:"MA" ,senha: '44556677', setor:{nome:"Consultorio",id:4,sigla:"CONS"}, cargo:"Gerente Setor", mensagens:[] },
    {email:'adsonLu@fsph.gov.br', nome:"Adson", avatar:"AD", senha:"40028922", setor:{nome:"Ambulatorio",id:5,sigla:"AMB"}, cargo:"Gerente Setor", mensagens:[]},
    {email:'neymar@fsph.gov.br', nome:"Neymar", avatar:"NY", senha:"neymar123", setor:{nome:"Recepcao",id:6,sigla:"RECP"}, cargo:"Gerente Setor", mensagens:[]},
    {email:'messi@fsph.gov.br', nome:"Messi", avatar:"ME", senha:"messi123", setor:{nome:"Labolatorio",id:7,sigla:"LAB"}, cargo:"Gerente Setor", mensagens:[]},
    {email:'critianoRo@fsph.gov.br', nome:"Cristiano", avatar:"CR", senha:"cristiano", setor:{nome:"Labolatorio",id:7,sigla:"LAB"}, cargo:"Enfermeiro", mensagens:[]}
]

if(JSON.parse(localStorage.getItem('funcionarios')) == null)
    localStorage.setItem('funcionarios', JSON.stringify(users))

const setor = [
    {nome:"Recursos Humanos",id:1,sigla:"RH"},
    {nome:"Tecnologia da Informação",id:2,sigla:"TI"},
    {nome:"Enfermaria",id:3,sigla:"ENF"},
    {nome:"Consultorio",id:4,sigla:"CONS"},
    {nome:"Ambulatorio",id:5,sigla:"AMB"},
    {nome:"Recepcao",id:6,sigla:"RECP"},
    {nome:"Labolatorio",id:7,sigla:"LAB"}
]

// add departamentos no localStore
localStorage.setItem('setor',JSON.stringify(setor))

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
            particles.push(new Particle());
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector('button');
    btn.textContent = 'Entrando...';
    btn.disabled = true;

    const email = emailInput.value;
    const senha = senhaInput.value;

    let validacao = false;

    users.map((user)=>{
        if (validacao) return

        if(email == user.email && senha== user.senha){
            validacao = true
            localStorage.setItem('login', JSON.stringify(user));
            window.location.href = 'homePage.html';

        }
    })

    if (!validacao) {
        emailInput.classList.add('error');
        senhaInput.classList.add('error');
        popup.style.display = 'flex';
    }

    setTimeout(() => {
        btn.textContent = 'Entrar'; // Corrigido
        btn.disabled = false;
    }, 2000);
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    emailInput.classList.remove('error');
    senhaInput.classList.remove('error');
});