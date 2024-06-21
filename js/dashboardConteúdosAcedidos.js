import * as User from "/js/models/userModel.js"

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
    const userEmail = User.userEmail();
    let progress = localStorage.getItem(`pageProgress_${userEmail}`);
    return progress ? JSON.parse(progress) : { tsiw: 0, dashboard: 0, about: 0, course: 0, maze: 0 }; //return progress ou return 0
}
console.log(getProgress());
User.userEmail()


// guardar progress data na localstorage:
function setProgress(progress) {
    const userEmail = User.userEmail();
    localStorage.setItem(`pageProgress_${userEmail}`, JSON.stringify(progress));
}

// update progress bar:
function updateProgressBar(progress) {
    const barChart = document.getElementById('content_acessed');
    const chart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: ['TSIW', 'Dashboard', "Comunidade", "1º Ano", 'MAZE'],
            datasets: [{
                label: "Conteúdos Acedidos",
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
                        color: 'white', font: {size: "14px"} // números no eixo x
                    },
                    grid: {
                        color: 'rgb(16, 76, 100)' // linhas no eixo x
                    }
                },
                y: {
                    ticks: {
                        color: 'white', font: {size: "14px"} // números no eixo x
                    },
                    grid: {
                        color: 'rgb(16, 76, 100)' // linhas no eixo x
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "white",
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });
}



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


// receber medals de acordo com o conteudo acedido
function accessedContent() {
    let medalContent1 = document.querySelector(".medal-content-accessed1");
    let medalContent2 = document.querySelector(".medal-content-accessed2");
    let medalContent3 = document.querySelector(".medal-content-accessed3");
    let medalContent4 = document.querySelector(".medal-content-accessed4");
    let medalContent5 = document.querySelector(".medal-content-accessed5");

    for (let key in getProgress()) {
        // console.log(key);
        if (medalContent1 && key == "tsiw" && getProgress()[key] == 100) {
            // console.log(getProgress()[key]);
            medalContent1.src = "/assets/dashboard/quality-control.png"}
        if (key == "about" && getProgress()[key] == 100) {
            medalContent3.src = "/assets/dashboard/quality-control.png"}
        if (key == "course" && getProgress()[key] == 100) {
            medalContent4.src = "/assets/dashboard/quality-control.png"}
        if (key == "maze" && getProgress()[key] == 100) {
            medalContent5.src = "/assets/dashboard/quality-control.png"}
        if (key == "dashboard" && getProgress()[key] == 100) {
            medalContent2.src = "/assets/dashboard/quality-control.png"}
    }
}
accessedContent()