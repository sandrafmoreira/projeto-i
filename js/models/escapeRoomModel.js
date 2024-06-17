export default class EscapeRoom {
    pc_password = ''; //Irá conter a password que irá desbloquear o PC!
    player_password = ''; //Para guardar a password que o jogar vai inserindo
    pc_locked = false; //Para saber se o jogador já desbloqueou o PC
    player_tries = null; //Nº de tentativas que o jogador tem para desbloquear o PC! (3 por default)
    drawerCode = null; //Irá conter a password que irá desbloquear a gaveta!
    playerCode = '0000'; //Para guardar o código da gaveta que o jogador vai inserindo!
    boxColors = []; //Irá conter as cores dos quadrados para desbloquear o cofre (As cores já são escolhidas por default!)
    boxColorOrder = []; //A ordem correta das cores que irá abrir o cofre
    playerColorOrder = []; //Ordem das cores que o jogador vai inserindo!
    openDrawer = false; //Para saber se o jogador já abriu a gaveta!
    openBox = false;   //Para saber se o jogador já abriu a caixa!
    postItClicked = false; //Para saber se o jogador já clicou no post-it clicável no caderno!
    memoryGameSolved = false; //Para saber se o jogador já resolveu o jogo da memoria!!
    time = ''; //Tempo que o jogador demora a completar o Escape Room!


    constructor(pc_password, player_password, pc_locked, player_tries, drawerCode, playerCode, boxColors, boxColorOrder, playerColorOrder,openDrawer, openBox, postItClicked, memoryGameSolved, time) {
        this.pc_password = pc_password;
        this.player_password = player_password;
        this.pc_locked = pc_locked;
        this.player_tries = player_tries;
        this.drawerCode = drawerCode;
        this.playerCode = playerCode;
        this.boxColors = boxColors
        this.boxColorOrder = boxColorOrder;
        this.playerColorOrder = playerColorOrder;
        this.openDrawer = openDrawer;
        this.openBox = openBox
        this.postItClicked = postItClicked;
        this.memoryGameSolved = memoryGameSolved;
        this.time = time;
    }

    /**
     * Função que gere a password que irá desbloquear o PC principal
     * A password é totalmente aleatória, podendo qualquer letra ou número
     * A password é sempre de 6 caracteres/digitos
     */
    generatePassword() {
        let password = ''
        let chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 6; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }

        this.pc_password = password;
    }


    /**
     * Função que gere a password que irá desbloquear a gaveta
     * A password consiste em 4 numeros de 0 a 9!
     */
    generateDrawerCode() {
        let secretNumber = ''
        let numbers = '0123456789'
        for(let i = 0; i < 4; i++) {
            secretNumber += numbers.charAt(Math.floor(Math.random() * numbers.length))
        }
        this.drawerCode = secretNumber
    }

    /**
     * Função que gere a ordem das cores que irá destrancar o cofre dentro da gaveta!
     * As cores que são escolhidas são provenientes da propriedade 'boxColors' com cores já pré-definidas!
     */
    generateColorOrder() {
        let chooseColor = ''
        for(let i = 1; i < 4; i++) {
            chooseColor = Math.floor(Math.random() * this.boxColors.length) 
            this.boxColorOrder.push(this.boxColors[chooseColor])
            }
    }

    
}