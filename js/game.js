$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps(); 
//Allows imagemaps to be used in a responsive design 
// by recalculating the area coordinates 
// to match the actual image size on load and window.resize
});

//ESCAPE ROOM
const book = document.getElementById('book').addEventListener('click', () => {
    let bookmarker = `
    <section class="bookmarker">
        <h3>${secretNumber}</h3>
    </section>
    `

    openModal()
    addHTML.innerHTML = bookmarker
    document.querySelector('#modal_main_img').src = "../img/game/book.jpg"
})

const drawer = document.getElementById('drawer').addEventListener('click', () => {
    //Codigo para abrir a gaveta

    //
    let box = `
    <section class="locked-box">
        <div class="square" id="box1"></div>
        <div class="square" id="box2"></div>
        <div class="square" id="box3"></div>
    </section>
    `
    
    openModal()
    addHTML.innerHTML += box
    let box1 = document.querySelector('#box1')
    let box2 = document.querySelector('#box2')
    let box3 = document.querySelector('#box3')
    
    document.querySelectorAll('.square').forEach(box => {
        let iteration = 0;
        box.addEventListener('click', () => {
            box.style.backgroundColor = colorsPicked[iteration]
            iteration += 1;
            if (iteration == 9) {
                iteration = 0;
                box.style.backgroundColor = colorsPicked[iteration]
            }
        })
        if (box1.style.backgroundColor == colorsPicked[correctOrder[0]] && 
            box2.style.backgroundColor == colorsPicked[correctOrder[1]] &&
            box3.style.backgroundColor == colorsPicked[correctOrder[2]]) {
                alert('You won!!! :DD')
        }
    })
})

const notebook = document.getElementById('notebook').addEventListener('click', () => {
    let notebook = `
        <section class="color-order">
            <h4 class="color" id="place1">${correctOrder[0]}</h4>
            <h4 class="color" id="place2">${correctOrder[1]}</h4>
            <h4 class="color" id="place3">${correctOrder[2]}</h4>
        </section>
    `

    openModal()
    addHTML.innerHTML = notebook
    document.querySelector('#modal_main_img').src = "../img/game/notebook2.png"
})

const keyboard = document.getElementById('keyboard').addEventListener('click', () => {
    openModal()
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
    let minutes = 0;
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
let addHTML = document.querySelector('#modal_secondary_img')
let closeButton = document.getElementsByClassName('close')[0];
let foundColorOrder = false

function openModal() {
    addHTML.innerHTML = ''
    modal.style.display = 'block';


}
function closeModal() {
    modal.style.display = 'none';
    document.querySelector('#modal_main_img').src = ''
}

let correctOrder = []
let fontColors = ['#ECE1E5', '#1E5F4C','#930E0E','#124207','#0CA7D1']
let colorsPicked = []
let secretNumber = ''
boxCode()
pickColors()
chooseColorsOrder(colorsPicked)

function boxCode() {
    let numbers = '0123456789'
    for(let i = 0; i < 4; i++) {
        secretNumber += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
}

function pickColors() {
    let characters = 'abcdef0123456789'

    for(let i = 1; i < 10; i++) {
        let code = '#'
        for(let j = 0; j < 6; j++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        colorsPicked.push(code)
        console.log(colorsPicked);
    }

    return colorsPicked
}

function chooseColorsOrder(colorsPicked) {
    for(let i = 1; i < 4; i++) {
        let chooseColor = Math.floor(Math.random() * colorsPicked.length)
        correctOrder.push(chooseColor)
        console.log(correctOrder);
        colorsPicked.splice(chooseColor, 1)

    }
    console.log(colorsPicked);
}

