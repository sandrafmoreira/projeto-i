class Event {
    name = '';
    image_src = '';

    constructor(name, image_src){
        this.name = name;
        this.image_src = image_src;
    }
}

let submitBtn = document.querySelector('#eventSubmitBtn');
let editBtn = document.querySelector('#eventEditBtn')
let form = document.querySelector('#eventsForm');
let openDivBtn = document.querySelector('#openEventDiv');
form.style.display = 'none'
document.querySelector('.manage_events_scroll_div').style.display = 'none'

let events = []
let eventSelected = ''
let rowIndex = null
init()
function init() {
    if(localStorage.eventos) {
        const tempEvents = JSON.parse(localStorage.eventos);
        for(let event of tempEvents) {
            events.push(new Event(event.name, event.image_src))
        }
    }
}

let divs = document.querySelectorAll("#adminDasboard > div")

if (document.querySelector('#openEventDiv')) {
    openDivBtn.addEventListener('click', () => {
        for (let i = 0; i < divs.length; i++){

            if (divs[i] == document.querySelector('#addEvents'))
            {
            
            divs[i].style.display="flex"
            form.style.display = 'flex'  
            document.querySelector('.manage_events_scroll_div').style.display = 'block'
            }else{
                divs[i].style.display="none" 
            }
        
        }
        adminDashboardLoadEvents(events)
    })
}

function adminDashboardLoadEvents(events) {
    let eventRow = ''
    document.querySelector('.manege_events_table').innerHTML = ''
    events.forEach(event => {
        eventRow = `
            <tr>
                <td>${event.name}
                    <div class="manege_icons_content">
                        <button id="edit_icon" class="material-symbols-outlined"><img src="/img/Icons/edit_icon.png"></button>
                        <button id="delete_icon" class="material-symbols-outlined"><img src="/img/Icons/delete_icon.png"></button>
                    </div>
                </td>
                
            </tr>
        `

        document.querySelector('.manege_events_table').innerHTML += eventRow
        eventRow = ''
    });

    let iconRow = button.closest('tr')
    rowIndex = iconRow.rowIndex

    document.querySelectorAll('#delete_icon').forEach(button => {
        button.addEventListener('click', () => {
            events.splice(iconRow.rowIndex,1)
            localStorage.events = JSON.stringify(events)
            adminDashboardLoadEvents(events)
            alert('Evento removido com sucesso!')
        })
    })

    document.querySelectorAll('#edit_icon').forEach(button => {
        button.addEventListener('click', () => {
            eventSelected = events[rowIndex]
            
            document.querySelector('.manege_event_form h3').textContent = 'Editar Evento'
            document.querySelector('#event_name').value = eventSelected.name
        })
    })
}

editBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    if(!form.checkValidity()){
        alert('É necessário preencher todos os campos!')
        return;
    }

    let name = document.querySelector('#event_name').value;
    let image = document.querySelector('#event_image').value;
    image = image.replace(/^.*\\/, "")

    editEvent(name, image, rowIndex)
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
    if(events.some(evento => evento.name == name)){
        alert('O evento que queres inserir já existe!');
        return;
    }

    events.push(new Event(name, image))
    localStorage.eventos = JSON.stringify(events)
}


function editEvent(name, image, rowIndex) {

    for (let i = 0; i < events.length; i++) {
        if (rowIndex != i) {
            if (events[i].name == name) {
                alert('O evento que queres inserir já existe!');
                return;
            }
        }
    }
    events[rowIndex] = (new Event(name, image))
    localStorage.eventos = JSON.stringify(events)
    alert('Evento alterado com sucesso!')
    document.querySelector('.manege_event_form h3').textContent = 'Adicionar Evento'

    document.querySelector('#event_name').value = '';
    adminDashboardLoadEvents(events)
}