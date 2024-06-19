import User from "../models/userModel.js"


let users = []

document.addEventListener('DOMContentLoaded', function() {
    loadDashboard()
    specialStat()
})

function loadDashboard() {
  if (localStorage.users) {
    let tempUsers = JSON.parse(localStorage.users)
    for(let user of tempUsers) {
        users.push(new User(user.name, user.surname, user.email, user.password, user.admin, user.dashboard))
    }
    let loggedUser = JSON.parse(sessionStorage.loggedUser)
    users.forEach(user => {
        if (user.name == loggedUser.name) {
            document.querySelector('#dashboardUserTitle').textContent = user.name
            if (user.dashboard.time_record.includes('00:')) {
                document.querySelector('#user_time_record').innerHTML =  `<span>${user.dashboard.time_record.slice(user.dashboard.time_record.indexOf(':') + 1) }s</span>`
            } else {
                document.querySelector('#user_time_record').innerHTML =  `
                <span>${user.dashboard.time_record.slice(0, user.dashboard.time_record.indexOf(':'))}m</span> 
                ${user.dashboard.time_record.slice(user.dashboard.time_record.indexOf('m')) + 1}s
            `
            }
            
        }
    });

    
  }
}

/*
Atribuir estatutos especiais e medalhas de acordo com o tempo recorde da escape room
*/
function specialStat() {
    let currentUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    let recordTime = currentUser.dashboard.time_record;

    let specialStatus = document.getElementById("specialStatus");
    let medal1 = document.querySelector(".medal1");
    let medal2 = document.querySelector(".medal2");
    let medal3 = document.querySelector(".medal3");

    let time = recordTime.split(":");

    if (time[0] <= 1 && time[1] <= 35)  {
        specialStatus.innerHTML = "Finalista de curso";
        medal3.src = "/assets/dashboard/medal-finalista.png"
        medal2.src = "/assets/dashboard/medal-sherlock.png"
        medal1.src = "/assets/dashboard/medal-novato.png"

    } else if (time[0] <= 2 && time[1] <= 30) {
        specialStatus.innerHTML = ("Sherlock dos Dados");
        medal2.src = "/assets/dashboard/medal-sherlock.png"
        medal1.src = "/assets/dashboard/medal-novato.png"

    } else {
        specialStatus.innerHTML = ("Programador novato");
        medal1.src = "/assets/dashboard/medal-novato.png"
    }
}

