

let submitBtn = document.querySelector('#eventSubmitBtn');
let form = document.querySelector('#eventsForm');
let openDivBtn = document.querySelector('#openEventDiv');
let closeDivBtn = document.querySelector('#closeEventDiv');

let events = []

openDivBtn.addEventListener('click',  () => {
    document.querySelector('#addEvents').style.display = 'block';
})

closeDivBtn.addEventListener('click', () => {
    document.querySelector('#addEvents').style.display = 'none';
})

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if(!form.checkValidity()){
        alert('É necessário preencher todos os campos!')
        return;
    }

    let name = document.querySelector('#event_name').value;
    let image = document.querySelector('#event_image').value;

    addEvent(name, image)
})

function addEvent(name, image){
    if(localStorage.eventos){
        events.push(JSON.parse(localStorage.eventos));

        if(events.some(evento => evento.name == name)){
            alert('O evento que queres inserir já existe!');
            return;
        }
    }

    const newEvent= new Event(name, image)
    events.push(newEvent)
    localStorage.eventos = JSON.stringify(events)
}


class Event {
    name = '';
    image_src = '';

    constructor(name, image_src){
        this.name = name;
        this.image_src = image_src;
    }
}