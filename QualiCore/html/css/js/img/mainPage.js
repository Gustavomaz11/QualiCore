document.addEventListener('DOMContentLoaded', function() {
    const botaoPerfil = document.getElementById('botaoPerfil');
    const menuPerfil = document.getElementById('menuPerfil');
    const modal = document.getElementById("modalPerfil");
    const btn = document.getElementById("meuPerfilBtn");
    const closeBtn = document.querySelector(".fecharModal");
    const rncBtn = document.querySelector('#rncBtn');
   
    rncBtn.addEventListener('click', () => {
        window.location.href = 'abrirRnc.html';
    });

    btn.addEventListener('click', () => {
        modal.classList.add("show");
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove("show");
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
            document.body.style.overflow = 'auto';
        }
    });

    botaoPerfil.addEventListener('click', function(event) {
        event.stopPropagation();
        menuPerfil.classList.toggle('ativo');
    });

    document.addEventListener('click', function(event) {
        if (!menuPerfil.contains(event.target) && !botaoPerfil.contains(event.target)) {
            menuPerfil.classList.remove('ativo');
        }
    });

    // Função para gerar cores com base no índice
    function generateColors(index) {
        const hue = (index * 137.5) % 360;
        return `hsl(${hue}, 70%, 60%)`;
    }

    // Configuração comum para os gráficos
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        family: "'Poppins', sans-serif",
                        size: 12
                    },
                    usePointStyle: true,
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                    family: "'Poppins', sans-serif",
                    size: 14
                },
                bodyFont: {
                    family: "'Roboto', sans-serif",
                    size: 12
                },
                cornerRadius: 8,
                padding: 12
            }
        }
    };

    // Gráfico de barras
    const ctx = document.getElementById('meuGrafico').getContext('2d');
    const labels = ['Douglas Abilio - TI', 'Juliana - Enfermaria', 'Silvia - Ambulatório', 'Maria - Laboratório', 'Marcelo - Coleta', 'Rose - Recepção'];
    const data = [12, 19, 3, 5, 2, 3];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Não Conformidades Detectadas por Setor',
                data: data,
                backgroundColor: labels.map((_, index) => generateColors(index)),
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: "'Roboto', sans-serif",
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Roboto', sans-serif",
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            plugins: {
                ...commonOptions.plugins,
                title: {
                    display: true,
                    text: 'Indice de Não Conformidades Abertas por Setor',
                    font: {
                        family: "'Roboto', sans-serif",
                        size: 18,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }
    });

    // Gráfico de rosca
    const ctxRosca = document.getElementById('meuGraficoRosca').getContext('2d');
    const labelsRosca = ['Resolvido', 'Em Aberto'];
    const dataRosca = [3, 12];
    
    new Chart(ctxRosca, {
        type: 'doughnut',
        data: {
            labels: labelsRosca,
            datasets: [{
                label: 'Registros de Não Conformidades abertas',
                data: dataRosca,
                backgroundColor: labelsRosca.map((_, index) => generateColors(index)),
                borderColor: 'white',
                borderWidth: 2,
            }]
        },
        options: {
            ...commonOptions,
            cutout: '60%',
            plugins: {
                ...commonOptions.plugins,
                title: {
                    display: true,
                    text: 'Índice das Não Conformidades Resolvidas e Pendentes',
                    font: {
                        family: "'Roboto', sans-serif",
                        size: 18,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });

    // Gráfico de linhas
    const ctxLinhas = document.getElementById('meuGraficoLinhas').getContext('2d');
    const labelsLinhas = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'];
    const dataLinhas = [3, 10, 5, 7, 12, 15];
    
    new Chart(ctxLinhas, {
        type: 'line',
        data: {
            labels: labelsLinhas,
            datasets: [{
                label: 'Evolução Mensal de Não Conformidades',
                data: dataLinhas,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: "'Roboto', sans-serif",
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Roboto', sans-serif",
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            plugins: {
                ...commonOptions.plugins,
                title: {
                    display: true,
                    text: 'Evolução Mensal de Não Conformidades',
                    font: {
                        family: "'Roboto', sans-serif",
                        size: 18,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }
    });
});
