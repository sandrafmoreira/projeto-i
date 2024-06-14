import EscapeRoom from "./models/escapeRoomModel.js";
import * as View from "./views/escapeRoomView.js"

$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps(); 
//Allows imagemaps to be used in a responsive design 
// by recalculating the area coordinates 
// to match the actual image size on load and window.resize
});

//ESCAPE ROOM
const book = document.getElementById('book').addEventListener('click', () => {
    openModal()
    View.getBook(escapeRoomStats.drawerCode)
})

const drawer = document.getElementById('drawer').addEventListener('click', () => {
    openModal()
    View.getDrawer(escapeRoomStats)
})

const notebook = document.getElementById('notebook').addEventListener('click', () => {
    openModal()
    View.getNotebook(escapeRoomStats)
})


const secondaryScreen = document.getElementById('secondaryScreen').addEventListener('click', () => {
    openModal()
})

const mainScreen = document.getElementById('mainScreen').addEventListener('click', () => {
    openModal()
})


// TEMPORIZADOR

let countdownTimer = document.querySelector('#countdownBtn');
let timer = document.querySelector('#timer');

let intervalID;

countdownTimer.addEventListener('click', () => {
    let minutes = 5;
    let seconds = 5;
    intervalID = countdown(minutes, seconds)
})


function countdown(minutes, seconds){
    setInterval(function() {
        timer.textContent = minutes + ':' + seconds;

    if (minutes <= 0 && seconds <= 0){
        clearInterval(intervalID)
        alert(`Time's up!`)
        return //????
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

let escapeRoomStats = new EscapeRoom('', 0, '0000', ['#112a46','#0f3315','#e15a20','#e01f1f','#8c0f0f','#000000','#c62490','#4a24c7','#e90e2f','#6f0ba1'], [], ['#C5C6CB','#C5C6CB','#C5C6CB'], false, false, false, '')
escapeRoomStats.generatePassword()
escapeRoomStats.generateDrawerCode()
escapeRoomStats.generateColorOrder()
console.log(escapeRoomStats.drawerCode);
