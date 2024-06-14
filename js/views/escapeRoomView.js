
export function getBook(secretNumber) {
    let book = `
    <div class="modal-content">
        <button class="close">X</button>
        <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/book.jpg" alt="Livro" id="modal_main_img">
        <div class="modal_secondary_img" id="bookmarker">
            <h3>${secretNumber}</h3>
        </div>
    </div>
    `
    document.querySelector('#esc_modal').innerHTML = book
    document.querySelector('.close').addEventListener('click', () => {
        closeModal()
    })
}

export function getDrawer(escapeRoomStats) {
    let drawer = `
        <div class="modal-content">
            <button class="close">X</button>
            <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/drawer.png" alt="Gaveta" id="modal_main_img">
            <div class="modal_secondary_img" id="locked_drawer">
                <div><button class="digit" id="number1">${escapeRoomStats.playerCode.charAt(0)}</button></div>
                <div><button class="digit" id="number2">${escapeRoomStats.playerCode.charAt(1)}</button></div>
                <div><button class="digit" id="number3">${escapeRoomStats.playerCode.charAt(2)}</button></div>
                <div><button class="digit" id="number4">${escapeRoomStats.playerCode.charAt(3)}</button></div>   
            </div>
        </div>
    `

    if (!escapeRoomStats.openDrawer) {
        document.querySelector('#esc_modal').innerHTML = drawer
        document.querySelector('.close').addEventListener('click', () => {
            closeModal()
        })

        document.querySelectorAll('.digit').forEach(digit => {
            digit.addEventListener('click', () => {
                let digitNumber = parseInt(digit.textContent)
                digitNumber += 1

                digitNumber == 10 ? digitNumber = 0 : digitNumber

                digit.textContent = digitNumber

                let digit1 = document.querySelector('#number1').textContent
                let digit2 = document.querySelector('#number2').textContent
                let digit3 = document.querySelector('#number3').textContent
                let digit4 = document.querySelector('#number4').textContent

                //Verificar se o codigo esta correto
                escapeRoomStats.playerCode = digit1 + digit2 + digit3 + digit4

                if (escapeRoomStats.playerCode.charAt(0) == escapeRoomStats.drawerCode.charAt(0) &&
                    escapeRoomStats.playerCode.charAt(1) == escapeRoomStats.drawerCode.charAt(1) &&
                    escapeRoomStats.playerCode.charAt(2) == escapeRoomStats.drawerCode.charAt(2) &&
                    escapeRoomStats.playerCode.charAt(3) == escapeRoomStats.drawerCode.charAt(3)) {
                        alert('Drawer open! :D')
                        escapeRoomStats.openDrawer = true
                        getBox(escapeRoomStats)
                    }
            
            })
        })
    } else {
        getBox(escapeRoomStats)
    }
}


export function getBox(escapeRoomStats) {
    let box = `
    <div class="modal-content">
        <button class="close">X</button>
        <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/locked box.png" alt="Cofre" id="modal_main_img">
        <div class="modal_secondary_img" id="locked_box">
            <button class="square" id="box1"></button>
            <button class="square" id="box2"></button>
            <button class="square" id="box3"></button>
        </div>
    </div>
    `

    if (!escapeRoomStats.openBox) { 
    document.querySelector('#esc_modal').innerHTML = box
    document.querySelector('.close').addEventListener('click', () => {
        closeModal()
    })

    let box1 = document.querySelector('#box1')
    let box2 = document.querySelector('#box2')
    let box3 = document.querySelector('#box3')

    box1.style.backgroundColor = escapeRoomStats.playerColorOrder[0]
    box2.style.backgroundColor = escapeRoomStats.playerColorOrder[1]
    box3.style.backgroundColor = escapeRoomStats.playerColorOrder[2]

    document.querySelectorAll('.square').forEach(box => {
        let iteration = 0;

        box.addEventListener('click', () => {            
            iteration += 1;
            
            iteration == 10 ? iteration = 0 : iteration
            box.style.backgroundColor = escapeRoomStats.boxColors[iteration]

            escapeRoomStats.playerColorOrder[0] = getComputedStyle(box1).backgroundColor;
            escapeRoomStats.playerColorOrder[1] = getComputedStyle(box2).backgroundColor;
            escapeRoomStats.playerColorOrder[2] = getComputedStyle(box3).backgroundColor;

            //Ciclo for para transformar as cores que vem em rgb (do "getComputedStyle") e transformar em Hexcode
            let colorIndex = 0
            for(let color of escapeRoomStats.playerColorOrder) {
                let r = parseInt(color.slice(color.indexOf('(') + 1, color.indexOf(',')))
                let g = parseInt(color.slice(color.indexOf(',') + 2, color.lastIndexOf(',')))
                let b = parseInt(color.slice(color.lastIndexOf(',') + 2, color.indexOf(')')))

                rgbToHex(r, g, b, escapeRoomStats, colorIndex)
                colorIndex += 1
            }
            
            //Verificar se a ordem das cores esta correta
            if (escapeRoomStats.playerColorOrder[0] == escapeRoomStats.boxColorOrder[0] &&
                escapeRoomStats.playerColorOrder[1] == escapeRoomStats.boxColorOrder[1] &&
                escapeRoomStats.playerColorOrder[2] == escapeRoomStats.boxColorOrder[2] 
            ) {
                alert('Caixa aberta!')
                getPostIt(escapeRoomStats)
            }
        })
    })
    } else {
        getPostIt(escapeRoomStats)
    }
}

export function getPostIt(escapeRoomStats) {
    let postIt = `
    <div class="modal-content">
        <button class="close">X</button>
        <div>
            <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/post-it.png" alt="Post It" id="modal_main_img">
            <h4>${escapeRoomStats.pc_password.slice(0, 3)}</h4>
        </div>
    </div>
    `

    document.querySelector('#esc_modal').innerHTML = postIt
    document.querySelector('.close').addEventListener('click', () => {
        closeModal()
    })
}

export function getNotebook(escapeRoomStats) {
    if (!escapeRoomStats.postItClicked) {
        let notebook = `
        <div class="modal-content">
            <button class="close">X</button>
            <div>
                <img usemap="#notebook" class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/notebook1.png" id="modal_main_img">

                <map name="notebook">
                    <area shape="poly" coords="268, 321, 293, 442, 163, 464, 138, 344" href="#" alt="Post It" id="postIt">
                </map>
            </div>
        </div>
        `

        document.querySelector('#esc_modal').innerHTML = notebook
        document.querySelector('.close').addEventListener('click', () => {
            closeModal()
        })

        $(document).ready(function(e) {
            $('img[usemap]').rwdImageMaps(); 
        //Allows imagemaps to be used in a responsive design 
        // by recalculating the area coordinates 
        // to match the actual image size on load and window.resize
        });

        const postIt = document.querySelector('#postIt').addEventListener('click', () => {
            escapeRoomStats.postItClicked = true

            notebook = `
                <div class="modal-content">
                    <button class="close">X</button>
                    <div>
                        <img usemap="notebook" class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/notebook2.png" id="modal_main_img">

                        <h4 class="secretWord" id="word1">color1</h4>
                        <h4 class="secretWord" id="word2">color2</h4>
                        <h4 class="secretWord" id="word3">color3</h4>
                    </div>
                </div>
            `
            document.querySelector('#esc_modal').innerHTML = notebook
            document.querySelector('.close').addEventListener('click', () => {
                closeModal()
            })
                
            let word1 = document.querySelector('#word1')
            let word2 = document.querySelector('#word2')
            let word3 = document.querySelector('#word3')

            word1.style.color = escapeRoomStats.boxColorOrder[0]
            word2.style.color = escapeRoomStats.boxColorOrder[1]
            word3.style.color = escapeRoomStats.boxColorOrder[2]
        }) 
    } else {
        let notebook = `
            <div class="modal-content">
                <button class="close">X</button>
                <div>
                    <img usemap="notebook" class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/notebook2.png" id="modal_main_img">

                    <h4 class="secretWord" id="word1">color1</h4>
                    <h4 class="secretWord" id="word2">color2</h4>
                    <h4 class="secretWord" id="word3">color3</h4>
                </div>
            </div>
        `
        document.querySelector('#esc_modal').innerHTML = notebook
        document.querySelector('.close').addEventListener('click', () => {
            closeModal()
        })

        let word1 = document.querySelector('#word1')
        let word2 = document.querySelector('#word2')
        let word3 = document.querySelector('#word3')

        word1.style.color = escapeRoomStats.boxColorOrder[0]
        word2.style.color = escapeRoomStats.boxColorOrder[1]
        word3.style.color = escapeRoomStats.boxColorOrder[2]
    }
}

function rgbToHex(r, g, b, escapeRoomStats, colorIndex) {
    let componentToHex = (color) => {
        let hex = color.toString(16)
        return hex.length == 1 ? "0" + hex : hex
    }

    let transformedColorCode = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
    escapeRoomStats.playerColorOrder[colorIndex] = transformedColorCode

}

function closeModal() {
    let modal = document.getElementById('esc_modal')
    modal.style.display = 'none';
}

