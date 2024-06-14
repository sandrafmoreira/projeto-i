export default class EscapeRoom {
    pc_password = '';
    drawerCode = null;
    playerCode = '0000';
    boxColors = []
    boxColorOrder = [];
    playerColorOrder = [];
    openDrawer = false;
    openBox = false;
    postItClicked = false;
    time = '';


    constructor(pc_password, drawerCode, playerCode, boxColors, boxColorOrder, playerColorOrder,openDrawer, openBox, postItClicked, time) {
        this.pc_password = pc_password;
        this.drawerCode = drawerCode;
        this.playerCode = playerCode;
        this.boxColors = boxColors
        this.boxColorOrder = boxColorOrder;
        this.playerColorOrder = playerColorOrder;
        this.openDrawer = openDrawer;
        this.openBox = openBox
        this.postItClicked = postItClicked;
        this.time = time;
    }

    generatePassword() {
        let password = ''
        let chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 6; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }

        this.pc_password = password;
    }

    generateDrawerCode() {
        let secretNumber = ''
        let numbers = '0123456789'
        for(let i = 0; i < 4; i++) {
            secretNumber += numbers.charAt(Math.floor(Math.random() * numbers.length))
        }
        this.drawerCode = secretNumber
    }

    generateColorOrder() {
        let chooseColor = ''
        for(let i = 1; i < 4; i++) {
            chooseColor = Math.floor(Math.random() * this.boxColors.length) 
            this.boxColorOrder.push(this.boxColors[chooseColor])
            }
    }

    
}