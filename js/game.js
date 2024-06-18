import EscapeRoom from "./models/escapeRoomModel.js";
import * as View from "./views/escapeRoomView.js"

$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps(); 
//Allows imagemaps to be used in a responsive design 
// by recalculating the area coordinates 
// to match the actual image size on load and window.resize
});

//ESCAPE ROOM

//Livro
const book = document.getElementById('book').addEventListener('click', () => {
    openModal()
    View.getBook(escapeRoomStats.drawerCode)
})

//Gaveta
const drawer = document.getElementById('drawer').addEventListener('click', () => {
    openModal()
    View.getDrawer(escapeRoomStats)
})

//Caderno
const notebook = document.getElementById('notebook').addEventListener('click', () => {
    openModal()
    View.getNotebook(escapeRoomStats)
})

//Ecrã da esquerda
const secondaryScreen = document.getElementById('secondaryScreen').addEventListener('click', () => {
    openModal()
    View.getSecondaryScreen(escapeRoomStats)
})

//Ecrã da direita
const mainScreen = document.getElementById('mainScreen').addEventListener('click', () => {
    openModal()
    View.getMainScreen(escapeRoomStats)
})

let countdownTimer = ''
let timer = ''
let timerRanOut = false

// TEMPORIZADOR
if(document.querySelector('#timer')) {
    countdownTimer = document.querySelector('#countdownBtn');
    timer = document.querySelector('#timer');
}



function countdown(){
    //Esta função faz a contagem decrescente, que é o tempo que o jogador tem para completar o Escape Room (apenas para o modo competitivo)

    //Por default, o jogador tem 5 minutos!
    let minutes = 10; 
    let seconds = 0;

    //Atualizar o tempo a cada segundo!
    let countdownTimer = setInterval(function() {
        timer.textContent = minutes + ':' + seconds;

    //Se o temporizador terminar!
    if (!timerRanOut) {
        if (minutes <= 0 && seconds <= 0){
            clearInterval(countdownTimer)
            timer.textContent = '----'
            alert(`Time's up!`)
            welcomeModal()
            return;
        }
        if (seconds == 0){
            seconds = 59
            minutes -= 1
        }
    
        seconds -= 1;
        if (seconds < 10){
            console.log('123');
            timer.textContent = minutes + ":" + '0' + seconds;
        } else if(minutes < 10 && seconds < 10){
            text.textContent = '0' + minutes + ':' + '0' + seconds;
        }
        } 
    }, 1000)
    

    
    
}

function welcomeModal() {
    //Modal que apresenta o começo do Escape Room! Contém uma mensagem que introduz o jogador ao seu objetivo!
    openModal()

    let modal = `
    <div class="modal-content">
        <div class="interactive_section" id="welcomeModal">
            <img src="../assets/maze/prof_Cyberino.png" class="avatar">
            <h4>Bem vindo ao TSIW Maze! O professor Cyberino pretende 
            acabar com todas as ferramentas de inteligência artificial... e o teu objetivo é pará-lo o mais rápido possível!
            Não te demores, tens 5 minutos para sair da sala e salvar as IAs! Boa sorte! </h4>
            <button class="startGame">Começar!</button>
        </div>
    </div>
    `

    document.querySelector('#esc_modal').innerHTML = modal
    document.querySelector('.startGame').addEventListener('click', () => {
        timerRanOut = false
        View.closeModal()
        countdown()
        playerTime(escapeRoomStats)
    })
}

function playerTime(escapeRoomStats) {
//Esta função faz a contagem o tempo que o jogador demora completar o Escape Room, depois vai ser utilizado para renderizar a dashboard do utilizador!

    let minutes = 0; 
    let seconds = 0;

    //Atualizar o tempo a cada segundo!
    setInterval(function() {

    //Se o temporizador terminar!
    if (minutes == 5){
        return //????
    }

    if (seconds == 60){
        seconds = 0
        minutes += 1
    }

    seconds += 1;
    if (seconds < 10){
        escapeRoomStats.timer = minutes + ":" + '0' + seconds;
    } else if(minutes < 10){
        escapeRoomStats.timer = '0' + minutes + ':' + seconds;
    } 
    }, 1000)
      
}

// ---------------------------------------------------------------------------------------
// MODAL
let modal = ''

if(document.getElementById('esc_modal')) {    
    modal = document.getElementById('esc_modal');
}

function openModal() {
    if (document.getElementById('esc_modal')) {
        modal.style.display = 'block';
    }
}

let escapeRoomStats = new EscapeRoom('', '', 3, '', '0000', ['#112a46','#0f3315','#e15a20','#e01f1f','#8c0f0f','#000000','#c62490','#6f0ba1'], [], ['#C5C6CB','#C5C6CB','#C5C6CB'], false, false, false, false, false, '')
escapeRoomStats.generatePassword()
escapeRoomStats.generateDrawerCode()
escapeRoomStats.generateColorOrder()

welcomeModal()
