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
let user1 = new User("Mario", "Prof", "mario@123", "123", false, dashboard);
users.push(admin1, admin2, admin3, user1);



// descarregar utilizadores da local storage:
export function init() {
    if(localStorage.users) {
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
        console.log(admin.email, "admin");
        console.log(loggedUser.email, "loggeUser");
        if(loggedUser.email == admin.email) {
            // console.log("aaaadmin")
            return true;
        } else {
            // console.log("ffalllllse")
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
    } 
}

// verificar se o user existe:
export function isLogged() {
    return sessionStorage.getItem("loggedUser") ? true : false;
  }

// logout:
export function logout() {
    sessionStorage.removeItem("loggedUser");
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

