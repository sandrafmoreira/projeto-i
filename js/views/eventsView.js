function updateEvents(){
    let events = []
    let new_image = ''
    if(localStorage.eventos){
        eventos = JSON.parse(localStorage.eventos)
    }

    events.forEach(event => {
        let get_div_class = document.querySelector('.carousel');

        if(get_div_class){
            new_image = `
            <img src="/img/index/${event.image_src}" alt="Poster do evento ${event.name}" title = "${event.name}">
            `

            get_div_class.innerHTML += new_image
        }
    });
}

updateEvents()