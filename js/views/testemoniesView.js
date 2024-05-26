export default function updateTestimonies(){
    let testemunhos = []
    if (localStorage.testemunhos) {
        testemunhos = JSON.parse(localStorage.testemunhos)
    }
   testemunhos.forEach(testimony => {
        console.log(testimony.testimony_number);
        let get_div_class = document.querySelector(`.testimony${testimony.testimony_number}`)
        console.log(get_div_class);

        if(get_div_class){
            console.log(get_div_class);
            let newTestimony = `
                <img src="${testimony.image}" alt="Fotografia de ${testimony.name}">
                <p class="paragraph">${testimony.text}</p>
            </div>
            <div class="testimony${testimony.testimony_number}_graduate">
                <h4 class="header4">${testimony.name}</h4>
                <h6 class"header6">
                    <ul>
                `
            for(let i = 0; i < testimony.job_position.length; i++){
                newTestimony += `<li>${testimony.job_position[i]}</li>`
            }

            newTestimony += `
                    </ul>
                </h6>
            `
            
            get_div_class.innerHTML = newTestimony
        }
    });

}


updateTestimonies()