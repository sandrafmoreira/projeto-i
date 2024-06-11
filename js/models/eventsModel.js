

let submitBtn = document.querySelector('#eventSubmitBtn');
let form = document.querySelector('#eventsForm');
let openDivBtn = document.querySelector('#openEventDiv');


let events = []

let divs = document.querySelectorAll("#adminDasboard > div")

openDivBtn.addEventListener('click', () => {
    for (let i = 0; i < divs.length; i++){
        console.log("Hiding div", i); 
        // divs[i].style.display = "none"

        if (divs[i] == document.querySelector('#addEvents'))
        {
           
           divs[i].style.display="flex"  
        }else{
            divs[i].style.display="none" 
        }
       
    }
})


submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if(!form.checkValidity()){
        alert('É necessário preencher todos os campos!')
        return;
    }

    let name = document.querySelector('#event_name').value;
    let image = document.querySelector('#event_image').value;
    image = image.replace(/^.*\\/, "")

    addEvent(name, image)
})

function addEvent(name, image){
    if(localStorage.eventos){
        events = JSON.parse(localStorage.eventos);

        if(events.some(evento => evento.name == name)){
            alert('O evento que queres inserir já existe!');
            return;
        }
    }

    events.push(new Event(name, image))
    localStorage.eventos = JSON.stringify(events)
}

function modifyEvent (name, image){

}


class Event {
    name = '';
    image_src = '';

    constructor(name, image_src){
        this.name = name;
        this.image_src = image_src;
    }
}