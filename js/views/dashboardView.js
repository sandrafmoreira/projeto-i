import User from "../models/userModel.js"

let users = []

document.addEventListener('DOMContentLoaded', function() {
    loadDashboard()
})

function loadDashboard() {
  if (localStorage.users) {
    let tempUsers = JSON.parse(localStorage.users)
    for(let user of tempUsers) {
        users.push(new User(user.name, user.surname, user.email, user.password, user.admin, user.dashboard))
    }
    let loggedUser = JSON.parse(sessionStorage.loggedUser)
    users.forEach(user => {
        console.log(user);
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