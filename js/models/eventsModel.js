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
    } else {
        let event1 = {
            name: 'Porto Tech Hub 1',
            image_src: 'image 51.png'
        }
        events.push(event1)

        let event2 = {
            name: 'Porto Tech Hub 2',
            image_src : 'image 52.png'
        }
        events.push(event2)

        let event3 = {
            name: 'TSIW Endpoints 1',
            image_src: 'image53.png'
        }
        events.push(event3)

        let event4 = {
            name: 'TSIW Endpoints 2',
            image_src: 'image54.png'
        }
        events.push(event4)

        localStorage.eventos = JSON.stringify(events) 
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

    

    document.querySelectorAll('#delete_icon').forEach(button => {
        button.addEventListener('click', () => {
            let iconRow = button.closest('tr')
            rowIndex = iconRow.rowIndex
            events.splice(iconRow.rowIndex,1)
            localStorage.events = JSON.stringify(events)
            adminDashboardLoadEvents(events)
            alert('Evento removido com sucesso!')
        })
    })

    document.querySelectorAll('#edit_icon').forEach(button => {
        button.addEventListener('click', () => {
            let iconRow = button.closest('tr')
            rowIndex = iconRow.rowIndex
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
    alert('Evento adicionado com sucesso!')
    adminDashboardLoadEvents(events)
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