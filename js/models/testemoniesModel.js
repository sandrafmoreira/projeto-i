let submitBtn = document.querySelector('#testimonySubmitBtn');
let form = document.querySelector('#testimonyForm');
let openDivBtn = document.querySelector('#openTestimonyDiv');

let testemunhos = []

let isThereAdiv = document.getElementById("adminDasboard")


let divs = document.querySelectorAll("#adminDasboard > div")

openDivBtn.addEventListener('click', () => {
    for (let i = 0; i < divs.length; i++){
        console.log("Hiding div", i); 
        // divs[i].style.display = "none"

        if (divs[i] == document.querySelector('#addTestimony'))
        {
           
           divs[i].style.display="flex"  
        }else{

            divs[i].style.display="none" 
        }
       
    }
})


submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //To check that no inputs are blank!
    if(!form.checkValidity()){
        alert('É necessário preencher todos os campos!!')
        return;
    }

    let name = document.querySelector('#testimony_name').value;
    let text = document.querySelector('#testimony_text').value;
    let job_position = document.querySelector('#testimony_job_position').value;
    let image = document.querySelector('#testimony_image').value;
    let placement = document.querySelector('#testimony_placement').value;

    image = image.replace(/^.*\\/, "");

    job_position = job_position.split(';')

    let testimony_number = +prompt('Indica o número do testemunho que desejas mudar! (1 a 3)')

    if (testimony_number != 1 && testimony_number != 2 && testimony_number != 3){
        alert(`Número errado! Tenta novamente!`)
        return;
    }  

    addTestimony(name, text, job_position, image, testimony_number, placement)
})

function addTestimony(name, text, job_position, image, testimony_number, placement){
    if(localStorage.testemunhos){
        testemunhos = JSON.parse(localStorage.testemunhos);

        if (testemunhos.some(testemunho => testemunho.name == name)){
            alert('O testemunho que queres inserir já existe!');
            return;
        }
    } 
    const newTestimony = new Testimony(name, text, job_position, image, testimony_number, placement)
    testemunhos.push(newTestimony)
    console.log(testemunhos);
    localStorage.testemunhos = JSON.stringify(testemunhos)
}


class Testimony {
    name = '';
    text = '';
    job_position = '';
    image_src = '';
    testimony_number = null;
    placement = ''

    constructor(name, text, job_position, image_src, testimony_number, placement){
        this.name = name;
        this.text = text;
        this.job_position = job_position;
        this.image_src = image_src;
        this.testimony_number = testimony_number;
        this.placement = placement;
    }

}