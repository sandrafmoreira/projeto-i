
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
            
            iteration == 8 ? iteration = 0 : iteration
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
            <h4>${escapeRoomStats.pc_password.slice(0, 3)}_ _ _</h4>
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
                            <div class="secretWord" id="color1"></div>
                            <div class="secretWord" id="color2"></div>
                            <div class="secretWord" id="color3"></div>
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
                
            let color1 = document.querySelector('#color1')
            let color2 = document.querySelector('#color2')
            let color3 = document.querySelector('#color3')

            color1.style.backgroundColor = escapeRoomStats.boxColorOrder[0]
            color2.style.backgroundColor = escapeRoomStats.boxColorOrder[1]
            color3.style.backgroundColor = escapeRoomStats.boxColorOrder[2]
        }) 
    } else {

        document.querySelector('#esc_modal').innerHTML = notebook2
        document.querySelector('.close').addEventListener('click', () => {
            closeModal()
        })

        let color1 = document.querySelector('#color1')
        let color2 = document.querySelector('#color2')
        let color3 = document.querySelector('#color3')

        color1.style.backgroundColor = escapeRoomStats.boxColorOrder[0]
        color2.style.backgroundColor = escapeRoomStats.boxColorOrder[1]
        color3.style.backgroundColor = escapeRoomStats.boxColorOrder[2]
    }
}

export function getSecondaryScreen(escapeRoomStats) {
    /**
     * Função que renderiza o ecrã da esquerda!
     * JOGO DA MEMÓRIA!
     */
    // <div class="modal-content">
    //     <button class="close">X</button>
    //     <div class="interactive_section" id="postIt_img" style="display: none">
    //         <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/post-it.png" alt="Post It" id="modal_main_img">
    //         <h4>${escapeRoomStats.pc_password.slice(3, 6)}</h4>
    //     </div>
    // </div>    
    let secondaryScreen = ''

    if(!escapeRoomStats.memoryGameSolved) {
        secondaryScreen = `
        <div class="modal-content">
            <button class="close">X</button>
            <section class="memoryGameContainer">
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
                <div style="width:30px;height:30px;" class="computerMemoryGame"></div>
            </section>
        </div>
        `

        document.querySelector('#esc_modal').innerHTML = secondaryScreen
        alert("Localiza os 2 pedaços de código! Memoriza a posição do primeiro pedaço que encontraste. Ao descobrires o segundo tens que identificar, no tabuleiro, a posição  do primeiro!")
        alert('Atênção, se perderes o jogo, o Cyberino ganha!')
        document.querySelector('.close').addEventListener('click', () => {
            closeModal()
        })

        let divs = document.querySelectorAll('.computerMemoryGame');

        let pos1 = Math.floor(Math.random() * divs.length);
        let pos2 = Math.floor(Math.random() * divs.length);

        while (pos1 == pos2) {
            pos2 = Math.floor(Math.random() * divs.length);
        }

        divs.forEach(div => {
            div.innerHTML = `<img style="width:80px" src="/assets/game/memoryGame/computer.png">`;
        })

        let clickedFirstCode = false;
        let clickedSecondCode = false;

        divs.forEach(div => {
            div.addEventListener('click', () => {
                // div.style.backgroundColor = "pink";
                if (!clickedFirstCode) {
                    if (div == divs[pos1]) {
                        showFirstCode(divs, pos1);
                        clickedFirstCode = true;
                    }
                }
                
                if (clickedFirstCode) {
                    // div.style.backgroundColor = "lightblue";
                    if (div == divs[pos2]) {
                        divs[pos2].innerHTML = `<img style="width:80px" src="/assets/game/memoryGame/computer-code.png">`;
                        clickedSecondCode = true;
                    } 
                }

                if (clickedSecondCode) {
                    // div.style.backgroundColor = "orange";
                    if (div == divs[pos1]) {
                        divs[pos1].innerHTML = `<img style="width:80px" src="/assets/game/memoryGame/computer-code.png">`;
                        setTimeout(() => {
                            escapeRoomStats.memoryGameSolved = true
                            }, 1000
                        );
                        secondaryScreen = `
                            <div class="modal-content">
                                <button class="close">X</button>
                                <div class="interactive_section" id="postIt_img2">
                                    <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/post-it.png" alt="Post It" id="modal_main_img">
                                    <h4>_ _ _ ${escapeRoomStats.pc_password.slice(3, 6)}</h4>
                                </div>
                            </div>` 
                        document.querySelector('#esc_modal').innerHTML = secondaryScreen
                        document.querySelector('.close').addEventListener('click', () => {
                            closeModal()
                    })

                    } else if (div !== divs[pos1] && div !== divs[pos2]) {
                        loseModal(escapeRoomStats);
                        }        
                }
            });
        });
    } else {
        secondaryScreen = `
        <div class="modal-content">
            <button class="close">X</button>
            <div class="interactive_section" id="postIt_img2">
                <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/post-it.png" alt="Post It" id="modal_main_img">
                <h4>_ _ _ ${escapeRoomStats.pc_password.slice(3, 6)}</h4>
            </div>
        </div>` 
    
        document.querySelector('#esc_modal').innerHTML = secondaryScreen
        document.querySelector('.close').addEventListener('click', () => {
            closeModal()
    })

    }
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
        <div class="interactive_section" id="mainScreen">
            <img class="img-fluid img-responsive rounded mx-auto d-block" src="/img/game/windows.jpg" alt="Ecrã de computador" id="mainScreen">
            <form get="#">
                <label for="password_input" class="password_input_label">Insere a password!</label>
                <input type="text" placeholder="Insira a password!" name="password_input" id="password_input" value="${escapeRoomStats.player_password}">
                <button id="passwordSubmitBtn">Inserir!</button>
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
        document.querySelector('#passwordSubmitBtn').addEventListener('click', (event) => {
            event.preventDefault()

            let password = document.querySelector('#password_input').value;

            escapeRoomStats.player_password = password
            if (password == escapeRoomStats.pc_password) {
                alert('Parabéns! Desbloqueaste o PC!')
                renderQuizQuestions(escapeRoomStats)
            } else {
                escapeRoomStats.player_tries -= 1;
                
                if(escapeRoomStats.player_tries == 0) {
                    loseModal()
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

function showFirstCode(divs, pos1) {
    divs[pos1].innerHTML = `<img style="width:80px" src="/assets/game/memoryGame/computer-code.png">`
    setTimeout(() => {
        divs[pos1].innerHTML = `<img style="width:80px" src="/assets/game/memoryGame/computer.png">`;
        }, 1000
    )
}

function saveStats(escapeRoomStats) {
    let user = JSON.parse(sessionStorage.loggedUser)
    let findUser = user.email
    let new_record = ''
    
    let users = JSON.parse(localStorage.users)
    users.forEach(user => {
        if (user.email == findUser) {
            if(user.dashboard.time_record != '') {
                new_record = user.dashboard.time_record
                if ( parseInt(user.dashboard.time_record.slice(1,2)) > parseInt(escapeRoomStats.time.slice(1, 2))) {
                    user.dashboard.time_record = escapeRoomStats.time
                    new_record = user.dashboard.time_record
                } else if (parseInt(user.dashboard.time_record.slice(1,2)) == parseInt(escapeRoomStats.time.slice(1, 2))){
                    if(parseInt(user.dashboard.time_record.slice(user.dashboard.time_record.indexOf(':') + 1)) > parseInt(escapeRoomStats.time.slice(escapeRoomStats.time.indexOf(':') + 1)))  {
                        user.dashboard.time_record = escapeRoomStats.time
                        new_record = user.dashboard.time_record
                    }
                }
            } else {
                user.dashboard.time_record = escapeRoomStats.time
                new_record = user.dashboard.time_record
            }
            
        }
    });
    localStorage.users = JSON.stringify(users)
    finalModal(escapeRoomStats, new_record)
}


function finalModal(escapeRoomStats, time_record) {
    document.querySelector('#timer').style.display = 'none'
    let competitiveMode = JSON.parse(sessionStorage.competitiveMode)
    let finalModal = ''

    if(competitiveMode) {
        finalModal = `
        <div class="modal-content">
            <div class="interactive_section" id="finalModal">
                <div id="confetti_div">
                    <img src="/assets/dashboard/confetti.png" class="confetti" id="confetti1">
                </div>
                <div id="congratulations_div">
                    <div id="congratulations_text">
                        <h2>PARABÉNS! :D</h2>
                        <h4>Travaste o plano do Cyberino de destruir as IAs... por agora...</h4>
                        <p>O tempo que demoraste: <b>${escapeRoomStats.time}</b></p>
                        <p>O teu tempo-recorde: <b>${time_record}</b></p>
                    </div>
                    <div id="congratulations_buttons">
                        <button id="goToDashboard">Ir para a dashboard</button>
                        <button id="startAgain">Jogar de novo</button>
                    </div>
                </div>
                <div id="confetti_div">
                    <img src="/assets/dashboard/confetti.png" class="confetti" id="confetti2">
                </div>
            </div>
        </div>
        `
    } else {
        finalModal = `
        <div class="modal-content">
            <div class="interactive_section" id="finalModal">
                <div id="confetti_div">
                    <img src="/assets/dashboard/confetti.png" class="confetti" id="confetti1">
                </div>
                <div id="congratulations_div">
                    <div id="congratulations_text">
                        <h2>PARABÉNS! :D</h2>
                        <h4>Travaste o plano do Cyberino de destruir as IAs... por agora...</h4>
                        <p>O tempo que demoraste: <b>${escapeRoomStats.time}</b></p>
                        <p>O teu tempo-recorde: <b>${time_record}</b></p>
                        <p>Como jogaste em Modo Passivo, o tempo-recorde não vai atualizar! </p>
                    </div>
                    <div id="congratulations_buttons">
                        <button id="goToDashboard">Ir para a dashboard</button>
                        <button id="startAgain">Jogar de novo</button>
                    </div>
                </div>
                <div id="confetti_div">
                    <img src="/assets/dashboard/confetti.png" class="confetti" id="confetti2">
                </div>
            </div>
        </div>
        `
    }
    

    document.querySelector('#esc_modal').innerHTML = finalModal
    document.querySelector('#goToDashboard').addEventListener('click', () => {
        let user = JSON.parse(sessionStorage.loggedUser)
        if (user.admin) {
            window.location.href = 'adminDashboard.html'
        } else {
            window.location.href = 'dashboard.html'
        }
        
    })

    document.querySelector('#startAgain').addEventListener('click', () => {
        location.reload();
    })
}

export function loseModal() {
    document.querySelector('#timer').style.display = 'none'
    let loseModal = `
    <div class="modal-content">
        <div class="interactive_section" id="loseModal">
            <h2>Oh não!</h2>
            <h4>O Cyberino conseguiu trancar-te no escritório e destruir todas as IAs!</h4>
            <div id="lose_buttons">
                <button id="goToDashboard">Ir para a dashboard</button>
                <button id="startAgain">Tentar de novo</button>
            </div>
        </div>
    </div>
    `

    document.querySelector('#esc_modal').innerHTML = loseModal
    document.querySelector('#goToDashboard').addEventListener('click', () => {
        let user = JSON.parse(sessionStorage.loggedUser)
        if (user.admin) {
            window.location.href = 'adminDashboard.html'
        } else {
            window.location.href = 'dashboard.html'
        }    
    })

    document.querySelector('#startAgain').addEventListener('click', () => {
        location.reload();
    })

}

function renderQuizQuestions(escapeRoomStats) {
    alert('Oh não! O Cyberino está a tentar travar-te! Tens agora que responder a 5 perguntas relacionadas com programação para sair da sala! Mas tem cuidado, se errares uma.. é GAME OVER!!')
    let questionsList = []
    const question1 = {
        question: 'Qual é o valor x após o valor de "x" após a execução do código?',
        image_src: '/img/game/quiz-questions/question1.png',
        answer1: '10',
        answer2: '5',
        answer3: '7.5',
        answer4: '15',
        correctAnswer: '7.5'
    }
    questionsList.push(question1)

    const question2 = {
        question: 'O que vai ser exibido na consola ao executar o seguinte código?',
        image_src: '/img/game/quiz-questions/question2.png',
        answer1: 'apple',
        answer2: 'undefined',
        answer3: 'cherry',
        answer4: 'banana',
        correctAnswer: 'apple'
    }
    questionsList.push(question2)

    const question3 = {
        question: 'O que vai ser exibido na consola ao executar o seguinte código?',
        image_src: '/img/game/quiz-questions/question3.png',
        answer1: '2',
        answer2: '3',
        answer3: '4',
        answer4: 'undefined',
        correctAnswer: '3'
    }
    questionsList.push(question3)

    const question4 = {
        question: 'Sabendo que o método "push" adiciona um novo elemento à última posição de uma lista, o que é exibido na consola?',
        image_src: '/img/game/quiz-questions/question4.png',
        answer1: '["1", "2", "3", "4"]',
        answer2: '["4", "1", "2", "3"]',
        answer3: '["4", "3", "2", "1"]',
        answer4: '["1", "2", "3"]',
        correctAnswer: '["1", "2", "3", "4"]',
    }
    questionsList.push(question4)

    const question5 = {
        question: 'O que é exibido na consola quando o seguinte código é executado?',
        image_src: '/img/game/quiz-questions/question5.png',
        answer1: 'hello',
        answer2: 'undefined',
        answer3: 'h',
        answer4: 'Error',
        correctAnswer: 'h',
    }
    questionsList.push(question5)

    const question6 = {
        question: 'Sabendo que o método "find" retorna o primeiro valor que é verdadeiro numa condição, qual é o valor de "result"?',
        image_src: '/img/game/quiz-questions/question6.png',
        answer1: '2',
        answer2: '3',
        answer3: '["2","3"]',
        answer4: 'Error',
        correctAnswer: '2'
    }
    questionsList.push(question6)

    const question7 = {
        question: 'O que é exibido na consola?',
        image_src: '/img/game/quiz-questions/question7.png',
        answer1: '5',
        answer2: '23',
        answer3: 'Error',
        answer4: '2',
        correctAnswer: '23'
    }
    questionsList.push(question7)

    const question8 = {
        question: 'Sabendo que o método "filter" retorna todos os valores que são verdadeiros numa condição, qual é o valor de "result"?',
        image_src: '/img/game/quiz-questions/question8.png',
        answer1: '["1","2","3","4","5"]',
        answer2: '["1","2"]',
        answer3: '["4","5"]',
        answer4: 'undefined',
        correctAnswer: '["4","5"]'
    }
    questionsList.push(question8)

    const question9 = {
        question: 'Usando este ciclo for, o que vai ser exibido na consola?',
        image_src: '/img/game/quiz-questions/question9.png',
        answer1: '0 1 2 3 4',
        answer2: '1 2 3 4 5 ',
        answer3: '0 1 3 6 10',
        answer4: '10',
        correctAnswer: '0 1 3 6 10'
    }
    questionsList.push(question9)

    const question10 = {
        question: 'A variável "person" é um objeto com as propriedades "name", e "age". O que vai ser exibido na consola depois da definição da variável "person"',
        image_src: '/img/game/quiz-questions/question10.png',
        answer1: '{name: "John", age: 30}',
        answer2: 'undefined',
        answer3: '30',
        answer4: 'John',
        correctAnswer: 'John'
    }
    questionsList.push(question10)

    let iteration = 0;
    quizGame(escapeRoomStats, questionsList, iteration)
}

function quizGame(escapeRoomStats, questionsList, iteration) {
    let questionHTML = '';
    let answer = '';
    let competitiveMode = JSON.parse(sessionStorage.competitiveMode)

    let chooseQuestion = Math.floor(Math.random() * (questionsList.length))

    questionHTML = `
        <div class="modal-content">
            <div class="interactive-section" id="mainScreen">
                <h3 id="quiz_question"> ${iteration + 1}) ${questionsList[chooseQuestion].question}</h3>
                <img src="${questionsList[chooseQuestion].image_src}"
                <br>
                <div id="quiz_options">
                    <button>${questionsList[chooseQuestion].answer1}</button>
                    <button>${questionsList[chooseQuestion].answer2}</button>
                    <button>${questionsList[chooseQuestion].answer3}</button>
                    <button>${questionsList[chooseQuestion].answer4}</button>
                </div>
            </div>
        </div>
    `

    document.querySelector('#esc_modal').innerHTML = questionHTML

    document.querySelectorAll('#quiz_options button').forEach(button => {
        button.addEventListener('click', () => {
            answer = button.textContent
            if (answer == questionsList[chooseQuestion].correctAnswer) {
                alert('Certa! :D')
                iteration += 1
                questionsList.splice(chooseQuestion, 1)
                if (iteration == 5) {
                    alert(`SAISTE DA SALA! PARABENS! Acabaste o Escape Room em: ${escapeRoomStats.time}`)
                    if (competitiveMode) {
                        saveStats(escapeRoomStats)
                    } else {
                        let user = JSON.parse(sessionStorage.loggedUser)
                        let findUser = user.email
                        let user_time_record = ''
                        let users = JSON.parse(localStorage.users)
                        users.forEach(user => {
                            if(user.email == findUser) {
                                user_time_record = user.dashboard.time_record
                            }
                        });
                        finalModal(escapeRoomStats, user_time_record)
                    }
                } else {
                    quizGame(escapeRoomStats, questionsList, iteration)
                }
            } else {
                alert('ERRADO! O Cyberino conseguiu o que precisava para acabar com as IAs! :( GAME OVER!')
                location.reload()
            }

        })
    })

}