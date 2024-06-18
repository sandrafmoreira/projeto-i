// calcular a percentagem do scroll numa pagina
// obter progress data da localstorage ou inicializar se não existir data
// guardar progress data na localstorage
// update progress bar
//inicializar progresso
// detetar scroll para update o progresso

// calcular a percentagem do scroll numa pagina:
function scrollPercentage() {
    const scrollPixels = window.scrollY; // obter nr de pixeis ao fazer scroll
    const pageHeight = document.body.scrollHeight; // height total da pagina
    const screenHeight = window.innerHeight; // height do screen
    const scrollPercent = (scrollPixels / (pageHeight - screenHeight)) * 100; // percentagem do scroll que já foi feito
    return Math.min(100, scrollPercent); // para a percentagem não exceder os 100% - Math.min( , ) returns o valor mais pequenos dos dois
}

// obter progress data da localstorage ou inicializar se não existir data:
function getProgress() {
    let progress = localStorage.getItem('pageProgress');
    return progress ? JSON.parse(progress) : { tsiw: 0, dashboard: 0, about: 0, course: 0, maze: 0 }; //return progress ou return 0
}

// guardar progress data na localstorage:
function setProgress(progress) {
    localStorage.setItem('pageProgress', JSON.stringify(progress));
}

// update progress bar:
function updateProgressBar(progress) {
    const barChart = document.getElementById('content_acessed');
    const chart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['TSIW', 'Dashboard', "Comunidade", "1º Ano", 'MAZE'],
            datasets: [{
                label: 'Conteúdos acedidos',
                data: [progress.tsiw, progress.dashboard, progress.about, progress.course, progress.maze],
                backgroundColor: ['rgb(158, 204, 250)', 'rgb(201, 77, 36)', 'rgb(255, 243, 106)', 'rgb(255, 255, 255)', 'rgb(58, 155, 149)',],
            }]
        },
        options: {
            indexAxis: 'y',  // horizontal bars
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: 'white' // números no eixo x
                    },
                    grid: {
                        color: 'rgb(16, 76, 100)' // linhas no eixo x
                    }
                },
                x: {
                    ticks: {
                        color: 'white' // números no eixo x
                    },
                    grid: {
                        color: 'rgb(16, 76, 100)' // linhas no eixo x
                    }
                }
            },
            // plugins: {
            //     legend: {
            //         display: false
            //     }
            // }
        }
    });
}

// chart.style.width ="110px";



// inicializar progresso:
let progress = getProgress();
updateProgressBar(progress);

// detetar scroll para dar update no progresso:
window.addEventListener('scroll', () => {
    const pageName = document.body.getAttribute('data-page-name'); //de todas as páginas
    const scrollPercent = scrollPercentage();
    if (progress[pageName] < scrollPercent) { //se o progresso guardado for menor que o progresso novo
        progress[pageName] = scrollPercent;
        setProgress(progress); //guardar novo progresso na local storage
        updateProgressBar(progress); //update chart
    }
});

