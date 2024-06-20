function updateTestimonies(){
    let testemunhos = []
    let get_div_class = ''
    let newTestimony = ''
    if (localStorage.testemunhos) {
        testemunhos = JSON.parse(localStorage.testemunhos)
    }
    console.log(testemunhos);
    testemunhos.forEach(testimony => {
        if(testimony.placement == 'course'){
            get_div_class = document.querySelector(`.testimony${testimony.testimony_number}`)

            if(get_div_class){
                newTestimony = `
                    <img src="/images/course/${testimony.image_src}" alt="Fotografia de ${testimony.name}">
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
                console.log(get_div_class);
                get_div_class.innerHTML = newTestimony
            }
        } else{
            get_div_class = document.querySelector(`.index_Testimonies_${testimony.testimony_number}`)
            if(get_div_class){
                newTestimony = `
                    <img class="index_testimonies_img" src="/assets/index/${testimony.image_src}" alt = "Fotografia de ${testimony.name}">

                    <div id="index_Testimonies_${testimony.testimony_number}_profile" class="index_Testimonies_perfil">
                        <h4>${testimony.name}</h4>
                        <ul>
                `
            for(let i = 0; i < testimony.job_position.length; i++){
                newTestimony += `<li>${testimony.job_position[i]}</li>`
            }

            newTestimony += `
                        </ul>
                    </div>
                    <div>
                        <p id="index_Testimonie_${testimony.testimony_number}_p" class="index_Testimonies_p">${testimony.text}</p>
                    </div>
            `

            console.log(get_div_class);
            get_div_class.innerHTML = newTestimony
            }
        }
    })

}


updateTestimonies()