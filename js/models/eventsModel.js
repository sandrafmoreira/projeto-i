

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


function init() {
    if(localStorage.eventos) {
        let savedEvents = JSON.parse(localStorage.eventos);
        for (let eventos of savedEvents) {
            eventos.push(new Book(evento.propriedade, evento.propriedade, evento.propriedade, evento.propriedade))
        } 
    } else {
        eventos = []
    }
}

function renderTable(eventos) {
    let adicionarFila = ''

    //Reinicar tabela para cada vez que for renderizada 
    document.querySelector('table').innerHTML = ''

    eventos.forEach(evento => {
        adicionarFila += `
            <tr>
                <td>
                
                    

                    <div class="manege_icons_content">
                        <i  class="material-symbols-outlined"> 
                            edit_square                    
                        </i>
                        <i id="delete_icon"  class="material-symbols-outlined">
                            delete
                        </i>
        
                    </div>
                </td>
            </tr>
        `

        document.querySelector('table').innerHTML += adicionarFila
        adicionarFila = ''
    })


}


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