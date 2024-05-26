import updateTestimonies from "../views/testemoniesView.js";

let submitBtn = document.querySelector('#submitBtn');
let form = document.querySelector('#testimonyForm');
let openDivBtn = document.querySelector('#openDiv');
let closeDivBtn = document.querySelector('#closeDiv');

let testemunhos = []

openDivBtn.addEventListener('click', () => {
    document.querySelector('#addTestimony').style.display = 'block';
})


closeDivBtn.addEventListener('click', () => {
    document.querySelector('#addTestimony').style.display = 'none';
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

    job_position = job_position.split(';')

    
    let testimony_number = +prompt('Indica o número do testemunho que desejas mudar! (1 a 3)')

    if (testimony_number != 1 && testimony_number != 2 && testimony_number != 3){
        alert(`Número errado! Tenta novamente!`)
        return;
    }  

    addTestimony(name, text, job_position, image, testimony_number)
})

function addTestimony(name, text, job_position, image, testimony_number){
    if(localStorage.testemunhos){
        testemunhos.push(JSON.parse(localStorage.testemunhos));

        if (testemunhos.some(testemunho => testemunho.name == name)){
            console.log('O testemunho que queres inserir já existe!');
            return;
        }
    } 
    
    const newTestimony = new Testimony(name, text, job_position, image, testimony_number)
    testemunhos.push(newTestimony)
    localStorage.testemunhos = JSON.stringify(testemunhos)

}


class Testimony {
    name = '';
    text = '';
    job_position = '';
    image_src = '';
    testimony_number = null;

    constructor(name, text, job_position, image_src, testimony_number){
        this.name = name;
        this.text = text;
        this.job_position = job_position;
        this.image_src = image_src;
        this.testimony_number = testimony_number;
    }

}