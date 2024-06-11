export default class EscapeRoom {
    book = '';
    drawer = '';
    box = '';
    notebook = '';
    secondaryScreen = '';
    mainScreen = '';

    constructor(book, drawer, box, notebook, secondaryScreen, mainScreen) {
        this.book = book;
        this.drawer = drawer;
        this.box = box;
        this.notebook = notebook;
        this.secondaryScreen = secondaryScreen;
        this.mainScreen = mainScreen;
    }

    set book(code) {
        
    }
}