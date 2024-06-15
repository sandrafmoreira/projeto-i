
export function getBook(secretNumber) {
    /**
     * Função que renderiza o livro com o código gerado previamente!
     */

    let book = `
    <div class="modal-content">
        <button class="close">X</button>
        <div class="interactive_section" id="book_image">
            <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/book.jpg" alt="Livro" id="modal_main_img">
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
    /**
     * Função que renderiza a gaveta!
     * A gaveta abre se o jogador inserir o codigo corretamente!
     * Ao "abrir" a gaveta, irá aparecer o cofre!
     */
    
    let drawer = `
        <div class="modal-content">
            <button class="close">X</button>
            <div class="interactive_section" id="drawer_img">
                <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/drawer.png" alt="Gaveta" id="modal_main_img">
                <div class="modal_secondary_img" id="locked_drawer_digits">
                    <div><button class="digit" id="number1">${escapeRoomStats.playerCode.charAt(0)}</button></div>
                    <div><button class="digit" id="number2">${escapeRoomStats.playerCode.charAt(1)}</button></div>
                    <div><button class="digit" id="number3">${escapeRoomStats.playerCode.charAt(2)}</button></div>
                    <div><button class="digit" id="number4">${escapeRoomStats.playerCode.charAt(3)}</button></div>   
                </div>
            </div>
        </div>
    `

    //Se o jogador ainda nao abriu a gaveta!
    if (!escapeRoomStats.openDrawer) {
        document.querySelector('#esc_modal').innerHTML = drawer
        document.querySelector('.close').addEventListener('click', () => {
            closeModal()
        })

        document.querySelectorAll('.digit').forEach(digit => {
            digit.addEventListener('click', () => {
                //Ir buscar o numero que esta no digito que o jogador clicou
                let digitNumber = parseInt(digit.textContent)

                //Para depois incrementa-lo
                digitNumber += 1

                digitNumber == 10 ? digitNumber = 0 : digitNumber

                digit.textContent = digitNumber

                let digit1 = document.querySelector('#number1').textContent
                let digit2 = document.querySelector('#number2').textContent
                let digit3 = document.querySelector('#number3').textContent
                let digit4 = document.querySelector('#number4').textContent

                //Verificar se o codigo esta correto
                escapeRoomStats.playerCode = digit1 + digit2 + digit3 + digit4

                //Se o codigo estiver correto
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
    /**
     * Função que renderiza o cofre!
     * O cofre abre se o jogador colocar as cores dos quadrados na ordem que é suposto!
     * A ordem correta das cores está no caderno, onde tem palavras que têm a ordem das cores!
     * Ao abrir o cofre, irá aparecer um post-it!
     */

    let box = `
    <div class="modal-content">
        <button class="close">X</button>
        <div class="interactive_section" id="box_img">
            <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/locked box.png" alt="Cofre" id="modal_main_img">
            <div class="modal_secondary_img" id="locked_box_squares">
                <button class="square" id="box1"></button>
                <button class="square" id="box2"></button>
                <button class="square" id="box3"></button>
            </div>
        </div>
    </div>
    `

    //Se o jogador ainda não tiver aberto o cofre
    if (!escapeRoomStats.openBox) { 
    document.querySelector('#esc_modal').innerHTML = box
    document.querySelector('.close').addEventListener('click', () => {
        closeModal()
    })

    let box1 = document.querySelector('#box1')
    let box2 = document.querySelector('#box2')
    let box3 = document.querySelector('#box3')

    //Ao voltar a abrir a modal, voltar a inserir as cores que o jogador tinha colocado previamente (antes de fechar a modal)
    box1.style.backgroundColor = escapeRoomStats.playerColorOrder[0]
    box2.style.backgroundColor = escapeRoomStats.playerColorOrder[1]
    box3.style.backgroundColor = escapeRoomStats.playerColorOrder[2]

    document.querySelectorAll('.square').forEach(box => {
        let iteration = 0; //Cada quadrado tem a sua "iteration" que é utilizada para ao clicar em cada quadrado aparecer a ordem das cores correta

        box.addEventListener('click', () => {            
            iteration += 1;
            
            iteration == 7 ? iteration = 0 : iteration
            box.style.backgroundColor = escapeRoomStats.boxColors[iteration]

            //Ir buscar as cores que estão em cada quadrado
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
                escapeRoomStats.openBox = true
                getPostIt(escapeRoomStats)
            }
        })
    })
    } else {
        getPostIt(escapeRoomStats)
    }
}

export function getPostIt(escapeRoomStats) {
    /**
     * Função que renderiza o post-it que está dentro do cofre!
     * O post-it contem os primeiros 3 caracteres/digitos que irá desbloquear o PC!
     */
    let postIt = `
    <div class="modal-content">
        <button class="close">X</button>
        <div class="interactive_section" id="postIt_img">
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
    /**
     * Função que renderiza o caderno!
     * Um dos post-its no caderno, é clicável!
     * Ao clicar no post-it clicável, por "de trás" do post-it estão palavras com cores especificas
     * A ordem das cores das palavras (de cima para baixo) é a ordem que irá desbloquear o cofre que está dentro da gaveta!
     */

    let notebook1 = `
        <div class="modal-content">
            <button class="close">X</button>
            <div class="interactive_section" id="notebook_img">
                <img usemap="#notebook" class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/notebook1.png" id="modal_main_img">

                <map name="notebook">
                    <area shape="poly" coords="268, 321, 293, 442, 163, 464, 138, 344" href="#" alt="Post It" id="postIt">
                </map>
            </div>
        </div>
        `
    let notebook2 = `
                <div class="modal-content">
                    <button class="close">X</button>
                    <div class="interactive_section" id="notebook_img">
                        <img usemap="notebook" class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/notebook2.png" id="modal_main_img">

                        <div class="colorOrder">
                            <h4 class="secretWord" id="word1"><b>Teste</b></h4>
                            <h4 class="secretWord" id="word2"><b>Teste</b></h4>
                            <h4 class="secretWord" id="word3"><b>Teste</b></h4>
                        </div>      
                    </div>
                </div>
            `
    //Se o jogador ainda não tiver clicado no post-it
    if (!escapeRoomStats.postItClicked) {

        document.querySelector('#esc_modal').innerHTML = notebook1
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
            //Para depois continuar a aparecer o caderno sem o post-it!
            escapeRoomStats.postItClicked = true

            document.querySelector('#esc_modal').innerHTML = notebook2
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

        document.querySelector('#esc_modal').innerHTML = notebook2
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

export function getSecondaryScreen(escapeRoomStats) {
    /**
     * Função que renderiza o ecrã da esquerda!
     * JOGO DA MEMÓRIA!
     */
    let secondaryScreen = `
    <div class="modal-content">
        <button class="close">X</button>
        <div class="interactive_section">
            <h2>${escapeRoomStats.pc_password.slice(3,6)}</h2>
        </div>
    </div>
    `

    document.querySelector('#esc_modal').innerHTML = secondaryScreen
    document.querySelector('.close').addEventListener('click', () => {
        closeModal()
    })
}

export function getMainScreen(escapeRoomStats) {
    /**
     * Função que renderiza o ecrã da direita!
     * Primeiramente, o jogador precisa de inserir a password de 6 caracteres/digitos para desbloquear o PC
     * O jogador tem por default 3 tentativas para o fazer, ao utilizar as 3 tentativas, o jogador perde automaticamente o Escape Room!
     * Ao inserir a password correta, irá desbloquear o PC e passar para os desafios finais do Escape Room para sair da sala!
     * DESAFIOS PROGRAMAÇÃO
     */
    let mainScreen = `
    <div class="modal-content">
        <button class="close">X</button>
        <div class="interactive_section">
            <form get="#">
                <input type="text" placeholder="Insira a password!" id="password_input" value="${escapeRoomStats.player_password}">
                <button id="submitBtn">Inserir!</button>
            </form>
        </div>
    </div>
    `

    document.querySelector('#esc_modal').innerHTML = mainScreen
    document.querySelector('.close').addEventListener('click', () => {
        closeModal()
    })

    if (escapeRoomStats.pc_locked) {
        document.querySelector('.interactive_section').style.display = 'none'
        
    } else {
        document.querySelector('#submitBtn').addEventListener('click', () => {
            let password = document.querySelector('#password_input').value;

            escapeRoomStats.player_password = password
            if (password == escapeRoomStats.pc_password) {
                alert(`PC desbloqueado! Tempo parou em ${escapeRoomStats.timer}`)
            } else {
                escapeRoomStats.player_tries -= 1;
                
                if(escapeRoomStats.player_tries == 0) {
                    alert('O PC foi bloqueado e não já não dá para desbloquea-lo.. o Cyberino ganhou! D:')
                    document.querySelector('.interactive_section').style.display = 'none'
                    escapeRoomStats.pc_locked = true;
                } else {
                    alert(`Password errada! Tens mais ${escapeRoomStats.player_tries} tentativas!`)
                }

            }
        })
    }
}

function rgbToHex(r, g, b, escapeRoomStats, colorIndex) {
    /**
     * Função que transforma o codigo rgb em codigo Hex
     * 
     */
    let componentToHex = (color) => {
        let hex = color.toString(16)
        return hex.length == 1 ? "0" + hex : hex
    }

    let transformedColorCode = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
    escapeRoomStats.playerColorOrder[colorIndex] = transformedColorCode

}

export function closeModal() {
    let modal = document.getElementById('esc_modal')
    modal.style.display = 'none';
}

