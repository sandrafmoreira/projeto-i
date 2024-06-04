$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps(); 
//Allows imagemaps to be used in a responsive design 
// by recalculating the area coordinates 
// to match the actual image size on load and window.resize
});

//ESCAPE ROOM
const book = document.getElementById('book').addEventListener('click', () => {
    openModal()
})

const drawer = document.getElementById('drawer').addEventListener('click', () => {
    openModal()
})

const notebook = document.getElementById('notebook').addEventListener('click', () => {
    openModal()
})

const keyboard = document.getElementById('keyboard').addEventListener('click', () => {
    openModal()
})

const screen = document.getElementById('screen').addEventListener('click', () => {
    openModal()
})


// TEMPORIZADOR

let countdownTimer = document.querySelector('#countdownBtn');
let timer = document.querySelector('#timer');

let intervalID;

countdownTimer.addEventListener('click', (event) => {
    let minutes = 13;
    let seconds = 13;
    intervalID = countdown(minutes, seconds)
})


function countdown(minutes, seconds){
    setInterval(function() {
        timer.textContent = minutes + ':' + seconds;

    if (minutes <= 0 && seconds <= 0){
        clearInterval(intervalID)
        alert(`Time's up!`)
        return; //????
    }

    if (seconds == 0){
        seconds = 59
        minutes -= 1
    }

    seconds -= 1;
    if (seconds < 10){
        timer.textContent = minutes + ":" + '0' + seconds;
    } else if(minutes < 10){
        timer.textContent = '0' + minutes + ':' + seconds;
    } else if(minutes < 10 && seconds < 10){
        text.textContent = '0' + minutes + ':' + '0' + seconds;
    }
    }, 1000)
    
}

// ---------------------------------------------------------------------------------------
// MODAL

let modal = document.getElementById('esc_modal');
let closeButton = document.getElementsByClassName('close')[0];
function openModal() {
    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
}