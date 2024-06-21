/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */
export default class User {

    constructor(name, surname, email, password, admin = false, dashboard) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.admin = admin;
        this.dashboard = dashboard;
    }
}

let dashboard = {
    time_record: '',
    medals: [],
    status: []
}

// localStorage.clear();
export let users = [];
let admin1 = new User("Sandra", "Moreira", "sandra@123", "123", true, dashboard);
let admin2 = new User("Nuno", "Nogueira", "nuno@123", "123", true, dashboard);
let admin3 = new User("Ken", "Lukau", "ken@123", "123", true, dashboard);
let user1 = new User("Mário", "Prof", "mario@123", "123", false, dashboard);

if (!localStorage.users) {
    users.push(admin1, admin2, admin3, user1)
    localStorage.users = JSON.stringify(users)
}

export function userEmail() {
    const userObj = sessionStorage.getItem("loggedUser");
    let userObject = JSON.parse(userObj)
    // console.log(userObj);
    for (let key in userObject) {
        // console.log(key);
        if (key == "email") {
            return console.log(userObject[key]);
        }
    }
}

if(document.querySelector('#openUserDiv')) {
    let openDivBtn = document.querySelector('#openUserDiv');
    let divs = document.querySelectorAll("#adminDasboard > div")

    let loggedUser = JSON.parse(sessionStorage.loggedUser)
    console.log(loggedUser);
    document.querySelector('.welcome_admin').innerHTML = `<h1>Olá ${loggedUser.name}!</h1>`
    openDivBtn.addEventListener('click', () => {
        for (let i = 0; i < divs.length; i++){
            console.log("Hiding div", i); 
            // divs[i].style.display = "none"

            if (divs[i] == document.querySelector('.deleteUsers'))
            {
            
            divs[i].style.display="flex"  
            }else{

                divs[i].style.display="none" 
            }
        
        }
        adminDashboardLoadUsers(users)
    })
}

function adminDashboardLoadUsers(users) {
    let userRow = ''
    document.querySelector('.manage_users_table').innerHTML = ''
    users.forEach(user => {
        userRow = `
            <tr>
                <td>${user.name}
                <button id="delete_icon" class="material-symbols-outlined"><img src="/img/Icons/delete_icon.png"></button>
                </td>
            </tr>
        `

        document.querySelector('.manage_users_table').innerHTML += userRow
        userRow = ''
    });

    document.querySelectorAll('#delete_icon').forEach(button => {
        button.addEventListener('click', () => {
            let row = button.closest('tr')
            users.splice(row.rowIndex,1)
            localStorage.users = JSON.stringify(users)
            adminDashboardLoadUsers(users)
            alert('Utilizador removido com sucesso!')
        })
    })
}

// descarregar utilizadores da local storage:
export function init() {
    if(localStorage.users) {
        users = []
        const tempUsers = JSON.parse(localStorage.users);
        for(let user of tempUsers) {
            users.push(new User(user.name, user.surname, user.email, user.password, user.admin, user.dashboard))
        }
    }
}

// verificar se o o admin esta logged para poder mudar a navbar:
export function admin() {
    const admins = users.filter(user => user.admin == true);
    const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    
    if (!loggedUser) {
        return false; // para aparecer a navbar mesmo que um user não esteja logged on
    }

    const isAdmin = admins.some(admin => {
        // console.log(admin.email, "admin");
        // console.log(loggedUser.email, "loggeUser");
        if(loggedUser.email == admin.email) {
            console.log("logged admin")
            return true;
        } else {
            console.log("logged user")
            return false;
        }
    })
    // console.log(isAdmin, "result");
    return isAdmin;
}


// descarregar user que esta a fazer login da local storage:
export function login(email, password) {
    const user = users.find(user =>
        user.email == email && user.password == password
    ); 
    if (user) {
        sessionStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
        alert("Tenta outra vez.")
    }
}

// verificar se o user existe:
export function isLogged() {
    return sessionStorage.getItem("loggedUser") ? true : false;
  }

// logout:
export function logout() {
    sessionStorage.removeItem("loggedUser");
    window.location.href = "/index.html";
}

// adicionar conta à classe e à local storage:
export function add(name, surname, email, password) {
    if(users.some(user => user.email === email)) {
        alert("Já existe uma conta com esse email.")
        throw Error(`Já existe uma conta com esse email.`);
    } else {
        users.push(
            new User(name, surname, email, password)
        )
        // atualizar a local storage:
        localStorage.setItem("users", JSON.stringify(users));
    }
    console.log(users);
}

