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

let submitBtn = document.querySelector('#testimonySubmitBtn');
let editBtn = document.querySelector('#testimonyEditBtn');
let form = document.querySelector('#testimonyForm');
let openDivBtn = document.querySelector('#openTestimonyDiv');

let testemunhos = []
let testimonySelected = ''
let rowIndex = null

init()

function init() {
    if (localStorage.testemunhos) {
        const tempTestemunhos = JSON.parse(localStorage.testemunhos)
        for(let testemunho of tempTestemunhos) {
            testemunhos.push(new Testimony(testemunho.name, testemunho.text, testemunho.job_position, testemunho.image_src, testemunho.testimony_number, testemunho.placement))
        }
    } else {
        let testimony1 = new Testimony('Nuno Sousa',
            '“Não posso deixar de referir que até ao entrar na ESMAD não sabia nada de programação e design, pelo que, além do meu esforço, o excelente acompanhamento dos professores e a sua experiência tanto a nível do ensino como também profissional foi sem dúvida o impulsionador disto tudo!”',
            ['Front-end developer na Carbmee','Governo Britãnico','Young Juries do Awwwards','8 prémios internacionais'],
            'testemunho1.png',
            1,
            'homepage') 
        testemunhos.push(testimony1)

        let testimony2 = new Testimony('Nuno Costa',
            '“Ingressar em TSIW preparou-me para os desafios do mundo profissional. Os diferentes projetos de grupo e o foco nas tecnologias mais recentes proporcionaram-me uma base sólida de conhecimentos e habilidades práticas, como o trabalho de equipa e resolução de problemas.”',
            ['Software Developer na MOG Technologies','Assistente Convidado na ESMAD','1º Lugar no concurso internacional de programação I Juezlti Contest of EU Code Week'],
            'testemunho3.png',
            2,
            'homepage')
        testemunhos.push(testimony2)
    
        let testimony3 = new Testimony('Raquel Silva',
            '“Avancei com a candidatura em TSIW, sem saber ao certo o que ia aprender. Quando percebi que era programação, fiquei em estado de choque. Ainda assim não desisti! Enquanto ainda estava no segundo ano, tive a oportunidade de aplicar a minha aprendizagem numa startup, a IOTECH, onde descobri outra paixão: a criação de conteúdos para redes sociais."',
            ['Game Developer na Kendir Studios','Jogos Educativos premiados na DigiEduHack 2021 e no Resilience Games 2022 a nível europeu!'],
            'raquel silva.png',
            3,
            'course')
        testemunhos.push(testimony3)

        let testimony4 = new Testimony('Diogo Fernandes',
            '“Comecei inicialmente com o objetivo de seguir uma carreira em programação front-end, mas graças à vasta oferta que o curso nos dá, descobri tudo o que se passava para além do código. Com isto, descobri então o mundo de User Experience e nunca mais olhei para trás”',
            ['Product Designer | Blip', 'Betfair, Paddy Power, Pokerstars, Fanduel, Sky Bet, etc.'],
            'diogo fernandes.png',
            1,
            'course')
        testemunhos.push(testimony4)

        let testimony5 = new Testimony('Inês Reis',
            '“Inicialmente sem rumo, descobri a minha paixão: o Design da Experiência do Utilizador e de Interfaces, apenas no segundo ano. A licenciatura, elogiada por muitos conhecidos pelas suas competências abrangentes,  proporcionou-me não apenas formação profissional.”',
            ['Kendir Studios','Gestora de Projetos e UX Designer', 'Criadora de recursos educativos digitais premiados pela Direção Geral da Educação'],
            'inês reis.png',
            2,
            'course')
        testemunhos.push(testimony5)

        let testimony6 = new Testimony('Joana Castro',
            '“A passagem pela ESMAD e pela licenciatura em Tecnologias e Sistemas de Informação para a Web proporcionou-me o ingresso no mercado de trabalho e neste mundo do desenvolvimento dos jogos educativos, na qual realizo atualmente a minha vida profissional”',
            ['Social Media | KuantoKusta'],
            'testemunho2.png',
            3,
            'homepage')
        testemunhos.push(testimony6)

        localStorage.testemunhos = JSON.stringify(testemunhos)
    }

    
}
let isThereAdiv = document.getElementById("adminDasboard")


let divs = document.querySelectorAll("#adminDasboard > div")

if(document.querySelector('#openEventDiv')) {
    openDivBtn.addEventListener('click', () => {
        for (let i = 0; i < divs.length; i++){

            if (divs[i] == document.querySelector('#addTestimony'))
            {
            divs[i].style.display="flex"  
            }else{

                divs[i].style.display="none" 
            }
        
        }
        adminDashboardLoadTestemonals(testemunhos)
    })  
} 

function adminDashboardLoadTestemonals(testemunhos) {
    let testimonyRow = ''
    document.querySelector('.manege_testimony_table').innerHTML = ''
    testemunhos.forEach(testemunho => {
        testimonyRow = `
        <tr>
            <td>
                ${testemunho.name}
                <div class="manege_icons_content">
                    <button id="edit_icon" class="material-symbols-outlined"><img src="/img/Icons/edit_icon.png"></button>
                    <button id="delete_icon" class="material-symbols-outlined"><img src="/img/Icons/delete_icon.png"></button>
                </div>
            </td>
        </tr>
        `

        document.querySelector('.manege_testimony_table').innerHTML += testimonyRow
        testimonyRow = ''
    });

    let iconRow = ''
    

    document.querySelectorAll('#delete_icon').forEach(button => {
        button.addEventListener('click', () => {
            iconRow = button.closest('tr')
            rowIndex = iconRow.rowIndex

            testemunhos.splice(iconRow.rowIndex, 1)
            localStorage.testemunhos = JSON.stringify(testemunhos)
            adminDashboardLoadTestemonals(testemunhos)
            alert('Testemunho removido com sucesso!')
        })
    })

    document.querySelectorAll('#edit_icon').forEach(button => {
        button.addEventListener('click', () => {
            iconRow = button.closest('tr')
            rowIndex = iconRow.rowIndex
            testimonySelected = testemunhos[rowIndex]

            document.querySelector('#testimony_name').value = testimonySelected.name
            document.querySelector('#testimony_placement').value = testimonySelected.placement
            document.querySelector('#testimony_text').value = testimonySelected.text
            document.querySelector('#testimony_job_position').value = ''
            for (let topico of testimonySelected.job_position) {
                document.querySelector('#testimony_job_position').value += `${topico};`
            }
        })
    })
}

editBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if(!form.checkValidity()){
        alert('É necessário preencher todos os campos!')
        return;
    }

    
    let name = document.querySelector('#testimony_name').value;
    let text = document.querySelector('#testimony_text').value;
    let job_position = document.querySelector('#testimony_job_position').value;
    let image = document.querySelector('#testimony_image').value;
    let placement = document.querySelector('#testimony_placement').value;

    image = image.replace(/^.*\\/, "");

    job_position = job_position.split(';')

    editTestimony(name, text, job_position, image, placement, testimonySelected)
})

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //Para verificar que nenhum input está em branco
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
    localStorage.testemunhos = JSON.stringify(testemunhos)
}

function editTestimony(name, text, job_position, image, placement, testimonySelected) {
    for (let i = 0; i < testemunhos.length; i++) {
        if (rowIndex != i) {
            if (testemunhos[i].name == name) {
                alert('O testemunho que queres inserir já existe!');
                return;
            }
        }
    }

    testemunhos[rowIndex] = new Testimony(name, text, job_position, image, testimonySelected.testimony_number, placement )
    localStorage.testemunhos = JSON.stringify(testemunhos)
    alert('Testemunho alterado com sucesso!')
    adminDashboardLoadTestemonals(testemunhos)

    document.querySelector('#testimony_name').value = ''
     document.querySelector('#testimony_text').value = ''
    document.querySelector('#testimony_job_position').value = ''
}
